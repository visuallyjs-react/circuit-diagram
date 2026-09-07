# Logic Gates Simulator Implementation

This document describes how the Logic Gates Simulator is implemented using `@visuallyjs/browser-ui-react` and `@visuallyjs/browser-ui`.

## Components

The application uses the following core components from `@visuallyjs/browser-ui-react`:

- **`DiagramProvider`**: Wraps the application to provide context and manage the state of the logic circuit.
- **`DiagramPaletteComponent`**: Displays a palette of logic gates (AND, OR, NOT, etc.) that can be dragged onto the canvas. It is configured to show labels.
- **`DiagramComponent`**: The main simulation area where the logic gates are rendered and connected.

## Configuration Options

### Diagram Options
The `DiagramComponent` is configured with a `diagramOptions` object:

- **`shapes`**: Includes `LOGIC_GATE_SHAPES`, which defines the visual representation and behavior of various logic gates.
- **`edges`**:
    - `connector`: `Orthogonal` - uses right-angle routing for connections between gates.
    - `anchors`: `["Right", "ContinuousLeft"]` - defines where connections can start (Right side) and end (Left side).
    - `deleteButton`: `hover` - shows a delete button when hovering over an edge.
    - `allowUnattached`: `false` - prevents edges from existing without being connected to gates.
- **`mediator`**:
    - `canLink`: A rule that ensures an output can only be connected if it doesn't already have an outgoing edge (though this is further refined in `modelOptions`).

### Model Options
The `modelOptions` object defines the connection rules:
- **`beforeConnect`**: Enforces logic gate constraints. It prevents an output from having more than one connection (in this specific implementation) and checks the `LOGIC_GATE_INPUT_RULES` to ensure gates don't exceed their maximum number of allowed inputs.

## CSS Integration
- **VisuallyJS Core**: The core styles are included in `src/index.css` via `@import "@visuallyjs/browser-ui/css/visuallyjs.css";`.
- **App Styles**: Custom styles for the logic gates layout are imported from `logic-gates.css`.
