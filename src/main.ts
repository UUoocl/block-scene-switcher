import * as Blockly from 'blockly';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import { javascriptGenerator } from 'blockly/javascript';
import OBSWebSocket from 'obs-websocket-js';

import './css/style.css';
import { OBSWebSocketWithStatus, StorageSource } from './types';
import { defineObsBlocks, setSceneOptions } from './blocks/definitions';
import { initObsGenerators } from './blocks/generators';
import { manageObsConnection } from './lib/obsConnectionManager';
import { initFileHandlers, loadAndInject } from './utils/fileManager';
import { initDeployHandlers, forceStopDeployment, triggerDeployment } from './utils/deployLogic';

// Import Toolbox
import { toolbox } from './blocks/toolbox';

// 1. SETUP BLOCKLY
Blockly.setLocale(En);
defineObsBlocks();
initObsGenerators();

const blocklyDiv = document.getElementById('blocklyDiv')!;
const workspace = Blockly.inject(blocklyDiv, { 
    toolbox, 
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
    zoom: { controls: true, wheel: true }
});

javascriptGenerator.init(workspace);
window.addEventListener('resize', () => Blockly.svgResize(workspace));
setTimeout(() => Blockly.svgResize(workspace), 100);


// 2. INITIALIZE GLOBAL OBJECT
window.obsWss = new OBSWebSocket() as OBSWebSocketWithStatus;


// 3. APP LOGIC EVENT LISTENERS
if (window.obsWss) {
    window.obsWss.on('Identified', async () => {
        console.log("✅ OBS Identified");
        document.getElementById('status')!.innerText = "Connected";
        document.getElementById('status')!.style.color = "#4CAF50";

        try {
            // 1. Load Scenes for Dropdowns
            const data = await window.obsWss!.call('GetSceneList');
            setSceneOptions(data.scenes as any);
            workspace.refreshToolboxSelection();
            
            // 2. CHECK FOR AUTO-DEPLOY URL PARAMS
            const params = new URLSearchParams(window.location.search);
            let deployFile = params.get('deploy');
            const location = params.get('location') as StorageSource | null;

            if (deployFile && location && (location === 'local' || location === 'obsidian')) {
                
                // UPDATE: Append .json if loading from Obsidian (Host)
                if (location === 'obsidian') {
                    deployFile += '.json';
                }

                console.log(`🚀 Auto-Deploying: ${deployFile} from ${location}`);
                
                // Load the file into workspace
                const success = await loadAndInject(deployFile, location, workspace);
                
                // If loaded successfully, start the logic
                if (success) {
                    setTimeout(() => {
                        triggerDeployment(workspace);
                    }, 500);
                } else {
                    console.error("❌ Auto-Deploy failed: Could not load file.");
                }
            }

        } catch (e) { 
            console.error(e); 
        }
    });

    window.obsWss.on('ConnectionClosed', () => {
        document.getElementById('status')!.innerText = "Disconnected";
        document.getElementById('status')!.style.color = "red";
        forceStopDeployment();
    });
}


// 4. INITIALIZE UTILS
initFileHandlers(workspace);
initDeployHandlers(workspace);


// 5. START CONNECTION
manageObsConnection();