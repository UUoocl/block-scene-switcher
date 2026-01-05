export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    // --- OBS CATEGORIES ---
    {
      "kind": "category", "name": "OBS Events", "colour": "230",
      "contents": [
        { "kind": "block", "type": "obs_event_scene_changed" },
        { "kind": "block", "type": "obs_event_mute_changed" },
        { "kind": "block", "type": "obs_event_stream_state" },
        { "kind": "block", "type": "obs_event_input_settings_changed" },
        { "kind": "block", "type": "obs_event_custom" },
        { "kind": "block", "type": "obs_event_input_active_state_changed" },
        { "kind": "block", "type": "obs_event_input_show_state_changed" },
        { "kind": "block", "type": "obs_event_scene_item_enable_state_changed" },
        { "kind": "block", "type": "obs_event_scene_item_lock_state_changed" }
      ]
    },
    {
      "kind": "category", "name": "OBS Actions", "colour": "160",
      "contents": [
        { "kind": "block", "type": "obs_request_set_scene" },
        { "kind": "block", "type": "obs_request_set_mute" },
        { "kind": "block", "type": "obs_request_control_stream" },
        { "kind": "block", "type": "obs_request_set_input_settings" }
      ]
    },
    
    { "kind": "sep" }, 
    // NEW CATEGORY
    {
      "kind": "category",
      "name": "Debug",
      "colour": "60",
      "contents": [
        { "kind": "block", "type": "custom_console_log" }
      ]
    },

    {
      "kind": "category",
      "name": "Broadcast Channel",
      "colour": "200",
      "contents": [
        { "kind": "block", "type": "broadcast_send" },
        { "kind": "block", "type": "broadcast_receive" },
                { "kind": "block", "type": "broadcast_message_object" }
              ]
            },
        
            {
              "kind": "category",
              "name": "SSE",
              "colour": "210",
              "contents": [
                { "kind": "block", "type": "sse_listen" },
                { "kind": "block", "type": "sse_message_object" }
              ]
            },
        
            { "kind": "sep" }, 
            // --- STANDARD CATEGORIES ---
    {
      "kind": "category",
      "name": "Logic",
      "colour": "210",
      "contents": [
        { "kind": "block", "type": "controls_if" },
        { "kind": "block", "type": "logic_compare" },
        { "kind": "block", "type": "logic_operation" },
        { "kind": "block", "type": "logic_negate" },
        { "kind": "block", "type": "logic_boolean" },
        { "kind": "block", "type": "logic_null" },
        { "kind": "block", "type": "logic_ternary" }
      ]
    },
    {
      "kind": "category",
      "name": "Loops",
      "colour": "120",
      "contents": [
        { "kind": "block", "type": "controls_repeat_ext", "inputs": { "TIMES": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } } } },
        { "kind": "block", "type": "controls_whileUntil" },
        { "kind": "block", "type": "controls_for", "inputs": { "FROM": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } }, "TO": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } }, "BY": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } } } },
        { "kind": "block", "type": "controls_forEach" },
        { "kind": "block", "type": "controls_flow_statements" }
      ]
    },
    {
      "kind": "category",
      "name": "Math",
      "colour": "230",
      "contents": [
        { "kind": "block", "type": "math_number", "fields": { "NUM": 123 } },
        { "kind": "block", "type": "math_arithmetic", "inputs": { "A": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } }, "B": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } } } },
        { "kind": "block", "type": "math_single", "inputs": { "NUM": { "shadow": { "type": "math_number", "fields": { "NUM": 9 } } } } },
        { "kind": "block", "type": "math_trig", "inputs": { "NUM": { "shadow": { "type": "math_number", "fields": { "NUM": 45 } } } } },
        { "kind": "block", "type": "math_constant" },
        { "kind": "block", "type": "math_number_property", "inputs": { "NUMBER_TO_CHECK": { "shadow": { "type": "math_number", "fields": { "NUM": 0 } } } } },
        { "kind": "block", "type": "math_round", "inputs": { "NUM": { "shadow": { "type": "math_number", "fields": { "NUM": 3.1 } } } } },
        { "kind": "block", "type": "math_on_list" },
        { "kind": "block", "type": "math_modulo", "inputs": { "DIVIDEND": { "shadow": { "type": "math_number", "fields": { "NUM": 64 } } }, "DIVISOR": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } } } },
        { "kind": "block", "type": "math_constrain", "inputs": { "VALUE": { "shadow": { "type": "math_number", "fields": { "NUM": 50 } } }, "LOW": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } }, "HIGH": { "shadow": { "type": "math_number", "fields": { "NUM": 100 } } } } },
        { "kind": "block", "type": "math_random_int", "inputs": { "FROM": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } }, "TO": { "shadow": { "type": "math_number", "fields": { "NUM": 100 } } } } },
        { "kind": "block", "type": "math_random_float" }
      ]
    },
    {
      "kind": "category",
      "name": "Text",
      "colour": "160",
      "contents": [
        { "kind": "block", "type": "text" },
        { "kind": "block", "type": "text_join" },
        { "kind": "block", "type": "text_append", "inputs": { "TEXT": { "shadow": { "type": "text" } } } },
        { "kind": "block", "type": "text_length", "inputs": { "VALUE": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } } } },
        { "kind": "block", "type": "text_isEmpty", "inputs": { "VALUE": { "shadow": { "type": "text", "fields": { "TEXT": "" } } } } },
        {
          "kind": "block",
          "type": "text_indexOf",
          "inputs": {
            "VALUE": { "shadow": { "kind": "block", "type": "variables_get" } }, // Fixed
            "FIND": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } }
          }
        },
        {
          "kind": "block",
          "type": "text_charAt",
          "inputs": {
            "VALUE": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        {
          "kind": "block",
          "type": "text_getSubstring",
          "inputs": {
            "STRING": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        { "kind": "block", "type": "text_changeCase", "inputs": { "TEXT": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } } } },
        { "kind": "block", "type": "text_trim", "inputs": { "TEXT": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } } } },
        { "kind": "block", "type": "text_print", "inputs": { "TEXT": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } } } },
        { "kind": "block", "type": "text_prompt_ext", "inputs": { "TEXT": { "shadow": { "type": "text", "fields": { "TEXT": "abc" } } } } }
      ]
    },
    {
      "kind": "category",
      "name": "Lists",
      "colour": "260",
      "contents": [
        { "kind": "block", "type": "lists_create_with", "extraState": { "itemCount": 0 } },
        { "kind": "block", "type": "lists_create_with" },
        { "kind": "block", "type": "lists_repeat", "inputs": { "NUM": { "shadow": { "type": "math_number", "fields": { "NUM": 5 } } } } },
        { "kind": "block", "type": "lists_length" },
        { "kind": "block", "type": "lists_isEmpty" },
        {
          "kind": "block",
          "type": "lists_indexOf",
          "inputs": {
            "VALUE": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        {
          "kind": "block",
          "type": "lists_getIndex",
          "inputs": {
            "VALUE": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        {
          "kind": "block",
          "type": "lists_setIndex",
          "inputs": {
            "LIST": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        {
          "kind": "block",
          "type": "lists_getSublist",
          "inputs": {
            "LIST": { "shadow": { "kind": "block", "type": "variables_get" } } // Fixed
          }
        },
        { "kind": "block", "type": "lists_split", "inputs": { "DELIM": { "shadow": { "type": "text", "fields": { "TEXT": "," } } } } },
        { "kind": "block", "type": "lists_sort" }
      ]
    },
    { "kind": "sep" },
    {
      "kind": "category",
      "name": "Variables",
      "colour": "330",
      "custom": "VARIABLE"
    },
    {
      "kind": "category",
      "name": "Functions",
      "colour": "290",
      "custom": "PROCEDURE"
    }
  ]
};