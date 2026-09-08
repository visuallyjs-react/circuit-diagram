import { isNode } from "@visuallyjs/browser-ui";
import {useDiagram} from "@visuallyjs/browser-ui-react";

/**
 * Inspector for the properties of a shape. This component will likely be moved into the VisuallyJs React integration in an upcoming release.
 * @param vertex
 * @constructor
 */
export function ShapePropertiesInspector({ vertex }) {
    if (!vertex || !isNode(vertex)) return null;

    const { type, category } = vertex.data;
    if (!type || !category) return null;

    const diagram = useDiagram()
    function resolveShapeDef() {
        if (diagram == null) return null
        const shapeLibrary = diagram.$ui.getShapeLibrary();
        const shapeSet = shapeLibrary.getShapeSet(category);
        if (!shapeSet) return null;
        return shapeSet.shapes.find(s => s.type === type)
    }

    const shapeDef = resolveShapeDef()
    if (!shapeDef || !shapeDef.properties) return null;

    return (
        <>
            {shapeDef.properties.map(prop => (
                <div key={prop.id} className="vjs-inspector-field">
                    <label>{prop.label || prop.id}</label>
                    {prop.type === 'string' && (
                        prop.values && prop.values.length > 0 ? (
                            <select vjs-att={prop.id}>
                                {prop.values.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        ) : (
                            <input type="text" vjs-att={prop.id} placeholder={prop.description} />
                        )
                    )}
                    {prop.type === 'number' && (
                        prop.values && prop.values.length > 0 ? (
                            <select vjs-att={prop.id}>
                                {prop.values.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        ) : (
                            <input type="number" vjs-att={prop.id} placeholder={prop.description} min={prop.min} max={prop.max} />
                        )
                    )}
                    {prop.type === 'boolean' && (
                        <select vjs-att={prop.id}>
                            <option value=""></option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    )}
                    {['string', 'number', 'boolean'].indexOf(prop.type) === -1 && (
                        <input type="text" vjs-att={prop.id} placeholder={prop.description} />
                    )}
                    {prop.description && <div className="vjs-field-desc">{prop.description}</div>}
                </div>
            ))}
        </>
    );
}
