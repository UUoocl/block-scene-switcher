import * as Blockly from 'blockly';
import { SaveFileBody, StorageSource } from '../types';

const SAVED_FOLDER = "block-scene-switcher/saved";
const LOCAL_PREFIX = "obs_flow_";

export function initFileHandlers(workspace: Blockly.WorkspaceSvg) {
    initSaveModal(workspace);
    initLoadModal(workspace);
}

// --- EXPORTED FOR AUTO-DEPLOY ---
export async function loadAndInject(filename: string, source: StorageSource, workspace: Blockly.WorkspaceSvg): Promise<boolean> {
    try {
        if (source === 'obsidian') {
            await loadFromObsidian(filename, workspace);
        } else {
            loadFromLocal(filename, workspace);
        }
        return true;
    } catch (e) {
        console.error("Auto-load failed:", e);
        return false;
    }
}

// ==========================================
//               SAVE LOGIC
// ==========================================

function initSaveModal(workspace: Blockly.WorkspaceSvg) {
    const saveBtn = document.getElementById('save');
    const modal = document.getElementById('saveModal');
    const closeBtn = document.getElementById('closeSave');
    const cancelBtn = document.getElementById('cancelSave');
    const confirmBtn = document.getElementById('confirmSave');
    const filenameInput = document.getElementById('saveFilename') as HTMLInputElement;
    const sourceSelect = document.getElementById('saveSource') as HTMLSelectElement;

    if (!saveBtn || !modal || !confirmBtn) return;

    saveBtn.addEventListener('click', () => {
        modal.style.display = "block";
        if (filenameInput) {
            filenameInput.value = ""; 
            filenameInput.focus();
        }
    });

    const closeModal = () => modal.style.display = "none";
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    confirmBtn.addEventListener('click', async () => {
        const filename = filenameInput ? filenameInput.value.trim() : "default";
        const source = sourceSelect ? (sourceSelect.value as StorageSource) : 'local';
        
        if (!filename) {
            alert("Please enter a filename.");
            return;
        }

        const data = Blockly.serialization.workspaces.save(workspace);

        if (source === 'obsidian') {
            await saveToObsidian(filename, data);
        } else {
            saveToLocal(filename, data);
        }
        
        closeModal();
    });
}

async function saveToObsidian(filename: string, data: unknown) {
    const payload: SaveFileBody = {
        folder: SAVED_FOLDER,
        filename: filename,
        data: data
    };

    try {
        const res = await fetch('/api/file/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) alert(`Saved "${filename}" to Obsidian!`);
        else alert("Obsidian Save failed: " + await res.text());
    } catch (e) {
        console.error(e);
        alert("Network error saving to Obsidian.");
    }
}

function saveToLocal(filename: string, data: unknown) {
    try {
        localStorage.setItem(LOCAL_PREFIX + filename, JSON.stringify(data));
        alert(`Saved "${filename}" to Local Storage!`);
    } catch (e) {
        console.error(e);
        alert("Failed to save locally. Storage might be full.");
    }
}

// ==========================================
//               LOAD LOGIC
// ==========================================

function initLoadModal(workspace: Blockly.WorkspaceSvg) {
    const loadBtn = document.getElementById('load');
    const modal = document.getElementById('loadModal');
    const closeBtn = document.getElementById('closeLoad');
    const tabs = document.querySelectorAll('.tab-btn');

    let currentSource: StorageSource = 'obsidian';

    if (!loadBtn || !modal) return;

    loadBtn.addEventListener('click', () => {
        modal.style.display = "block";
        refreshFileList(currentSource, workspace, modal);
    });

    const closeModal = () => modal.style.display = "none";
    closeBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            (e.target as HTMLElement).classList.add('active');
            
            currentSource = (e.target as HTMLElement).dataset.source as StorageSource;
            refreshFileList(currentSource, workspace, modal);
        });
    });
}

async function refreshFileList(source: StorageSource, workspace: Blockly.WorkspaceSvg, modal: HTMLElement) {
    const container = document.getElementById('fileList');
    if (!container) return;

    container.innerHTML = '<div style="padding:10px; color:#ccc;">Loading...</div>';

    let files: string[] = [];

    if (source === 'obsidian') {
        files = await fetchObsidianList();
    } else {
        files = fetchLocalList();
    }

    container.innerHTML = '';
    
    if (files.length === 0) {
        container.innerHTML = '<div style="padding:10px; color:#888;">No files found.</div>';
        return;
    }

    files.forEach(file => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerText = file;
        div.onclick = async () => {
            await loadAndInject(file, source, workspace);
            modal.style.display = "none";
        };
        container.appendChild(div);
    });
}

// --- API IMPLEMENTATIONS ---

async function fetchObsidianList(): Promise<string[]> {
    try {
        const params = new URLSearchParams({ folder: SAVED_FOLDER });
        const res = await fetch(`/api/file/list?${params.toString()}`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch (e) {
        console.error("Obsidian List Error", e);
        return [];
    }
}

function fetchLocalList(): string[] {
    const files: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(LOCAL_PREFIX)) {
            files.push(key.replace(LOCAL_PREFIX, ''));
        }
    }
    return files;
}

async function loadFromObsidian(filename: string, workspace: Blockly.WorkspaceSvg) {
    const params = new URLSearchParams({ folder: SAVED_FOLDER, filename });
    const res = await fetch(`/api/file/get?${params.toString()}`);
    if (!res.ok) throw new Error("Download failed");
    
    const json = await res.json();
    Blockly.serialization.workspaces.load(json, workspace);
}

function loadFromLocal(filename: string, workspace: Blockly.WorkspaceSvg) {
    const dataStr = localStorage.getItem(LOCAL_PREFIX + filename);
    if (!dataStr) throw new Error("File not found");
    
    const json = JSON.parse(dataStr);
    Blockly.serialization.workspaces.load(json, workspace);
}