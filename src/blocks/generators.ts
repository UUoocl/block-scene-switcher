import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly';

export const initObsGenerators = () => {
  // Events
  javascriptGenerator.forBlock['obs_event_scene_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('CurrentProgramSceneChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_mute_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('InputMuteStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_stream_state'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('StreamStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_input_settings_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('InputSettingsChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_custom'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('CustomEvent', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_input_active_state_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('InputActiveStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_input_show_state_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('InputShowStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_scene_item_enable_state_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('SceneItemEnableStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  javascriptGenerator.forBlock['obs_event_scene_item_lock_state_changed'] = (block: Blockly.Block) => {
    const branch = javascriptGenerator.statementToCode(block, 'DO');
    return `window.obsWss.on('SceneItemLockStateChanged', async (data) => {\n${branch}\n});\n`;
  };

  // Requests
  javascriptGenerator.forBlock['obs_request_set_scene'] = (block: Blockly.Block) => {
    const scene = block.getFieldValue('SCENE');
    return `await window.obsWss.call('SetCurrentProgramScene', { sceneName: '${scene}' });\n`;
  };

  javascriptGenerator.forBlock['obs_request_set_mute'] = (block: Blockly.Block) => {
    const input = block.getFieldValue('INPUT');
    const muted = block.getFieldValue('MUTE') === 'TRUE';
    return `await window.obsWss.call('SetInputMute', { inputName: '${input}', inputMuted: ${muted} });\n`;
  };

  javascriptGenerator.forBlock['obs_request_control_stream'] = (block: Blockly.Block) => {
    const action = block.getFieldValue('ACTION');
    return `await window.obsWss.call('${action}');\n`;
  };

  // NEW GENERATOR
  javascriptGenerator.forBlock['obs_request_set_input_settings'] = (block: Blockly.Block) => {
    const inputName = block.getFieldValue('INPUT');
    const overlay = block.getFieldValue('OVERLAY') === 'TRUE';
    // Ensure we have a default empty JSON object if input is missing
    const settings = javascriptGenerator.valueToCode(block, 'SETTINGS', javascriptGenerator.ORDER_ATOMIC) || '"{}"';
    
    // We assume the input provided by the user is a JSON String, so we parse it.
    return `await window.obsWss.call('SetInputSettings', { inputName: '${inputName}', inputSettings: JSON.parse(${settings}), overlay: ${overlay} });\n`;
  };
  // NEW GENERATOR: Console Log
  javascriptGenerator.forBlock['custom_console_log'] = (block: Blockly.Block) => {
    const logData = javascriptGenerator.valueToCode(block, 'LOG_DATA', javascriptGenerator.ORDER_ATOMIC) || "''";
    return `console.log(${logData});\n`;
  };

};