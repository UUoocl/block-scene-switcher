import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

let isDeployed = false;

export function initDeployHandlers(workspace: Blockly.WorkspaceSvg) {
    const deployBtn = document.getElementById('deploy');
    if (!deployBtn) return;

    updateButtonStyle(deployBtn, false);

    deployBtn.addEventListener('click', () => {
        if (isDeployed) {
            stopDeployment(workspace);
        } else {
            triggerDeployment(workspace);
        }
    });
}

export function forceStopDeployment() {
    if (isDeployed) {
        stopDeployment(null); 
    }
}

// --- EXPORTED FOR AUTO-DEPLOY ---
export function triggerDeployment(workspace: Blockly.WorkspaceSvg) {
    if (!window.obsWss || !window.obsWss.connected) {
        console.warn("Cannot deploy: OBS not connected.");
        alert("OBS is not connected.");
        return;
    }

    javascriptGenerator.init(workspace);
    const code = javascriptGenerator.workspaceToCode(workspace);

    try {
        console.log("Starting Logic...");
        eval(`(async () => { ${code} })()`);
        
        isDeployed = true;
        const btn = document.getElementById('deploy');
        if (btn) updateButtonStyle(btn, true);

    } catch (e) {
        console.error("Logic Error:", e);
        alert("Error running logic.");
        stopDeployment(null);
    }
}

function stopDeployment(workspace: Blockly.WorkspaceSvg | null) {
    console.log("Stopping Logic...");
    
    if (window.obsWss) {
        // Cleanup all known listeners
        const events = [
            'CurrentProgramSceneChanged', 'InputMuteStateChanged', 'StreamStateChanged',
            'InputSettingsChanged', 'CustomEvent', 'InputActiveStateChanged',
            'InputShowStateChanged', 'SceneItemEnableStateChanged', 'SceneItemLockStateChanged'
        ];
        events.forEach(e => window.obsWss!.removeAllListeners(e));
    }

    isDeployed = false;
    const btn = document.getElementById('deploy');
    if (btn) updateButtonStyle(btn, false);
}

function updateButtonStyle(btn: HTMLElement, active: boolean) {
    if (active) {
        btn.innerText = "Stop Logic";
        btn.style.backgroundColor = "#FF9800"; // Orange
        btn.style.color = "white";
    } else {
        btn.innerText = "Start Logic";
        btn.style.backgroundColor = "#888888"; // Grey
        btn.style.color = "white";
    }
}