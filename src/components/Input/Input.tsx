import "./Input.scss";

export default function Input(props: {
    type: string;
    placeholder: string;
    onChange?: (value: string) => void;
    value: string;
}) {
    return (
        <input
            className="default-input"
            type={props.type}
            placeholder={props.placeholder}
            onChange={(event) => {
                if (props.onChange) {
                    props.onChange(event.target.value);
                }
            }}
            value={props.value}
        />
    );
}
