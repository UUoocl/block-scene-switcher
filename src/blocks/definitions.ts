import * as Blockly from 'blockly';

// ... (Existing sceneOptions code) ...
export let sceneOptions: [string, string][] = [['Connect to OBS...', 'none']];
export function setSceneOptions(scenes: { sceneName: string }[]) {
  if (scenes.length > 0) {
    sceneOptions = scenes.map(s => [s.sceneName, s.sceneName]);
  } else {
    sceneOptions = [['No scenes found', 'none']];
  }
}

export const defineObsBlocks = () => {
  // ... (Existing Dropdown Block) ...
  Blockly.Blocks['obs_request_set_scene'] = {
    init: function(this: Blockly.Block) {
      this.appendDummyInput()
          .appendField("Switch to Scene")
          .appendField(new Blockly.FieldDropdown(() => sceneOptions), "SCENE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Sets the current program scene");
    }
  };

  Blockly.defineBlocksWithJsonArray([
    // --- EXISTING EVENTS ---
    {
      "type": "obs_event_scene_changed",
      "message0": "When Scene Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230,
      "tooltip": "Triggers when the program scene changes."
    },
    {
      "type": "obs_event_mute_changed",
      "message0": "When Mute State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_stream_state",
      "message0": "When Stream State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_input_settings_changed",
      "message0": "When Input Settings Change %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_custom",
      "message0": "When Custom Event %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_input_active_state_changed",
      "message0": "When Input Active State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_input_show_state_changed",
      "message0": "When Input Show State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_scene_item_enable_state_changed",
      "message0": "When Item Enable State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },
    {
      "type": "obs_event_scene_item_lock_state_changed",
      "message0": "When Item Lock State Changes %1 %2",
      "args0": [{ "type": "input_dummy" }, { "type": "input_statement", "name": "DO" }],
      "colour": 230
    },

    // --- REQUESTS ---
    {
      "type": "obs_request_set_mute",
      "message0": "Set Mute for %1 to %2",
      "args0": [
        { "type": "field_input", "name": "INPUT", "text": "Mic/Aux" },
        { "type": "field_checkbox", "name": "MUTE", "checked": true }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160
    },
    {
      "type": "obs_request_control_stream",
      "message0": "%1 Streaming",
      "args0": [{
        "type": "field_dropdown",
        "name": "ACTION",
        "options": [["Start", "StartStream"], ["Stop", "StopStream"], ["Toggle", "ToggleStream"]]
      }],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160
    },
    // NEW BLOCK: Set Input Settings
    {
      "type": "obs_request_set_input_settings",
      "message0": "Set Settings for %1 to %2 Overlay %3",
      "args0": [
        { "type": "field_input", "name": "INPUT", "text": "Source Name" },
        { "type": "input_value", "name": "SETTINGS", "check": "String" },
        { "type": "field_checkbox", "name": "OVERLAY", "checked": true }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
      "tooltip": "Sets input settings. 'Settings' must be a JSON string. Overlay=True merges settings, False resets defaults."
    },
    // NEW BLOCK: Console Log
    {
      "type": "custom_console_log",
      "message0": "console.log %1",
      "args0": [
        {
          "type": "input_value",
          "name": "LOG_DATA"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
      "tooltip": "Logs the input value to the browser console.",
      "helpUrl": ""
    }
  ]);
};