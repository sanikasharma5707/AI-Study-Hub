import "./FeatureCard.css";

function FeatureCard({
    icon,
    title,
    description,
    buttonText,
    onClick
}) {
    return (
        <div className="card">
            <div className="card-icon">
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onClick}>
                {buttonText}
            </button>
        </div>
    );
}
export default FeatureCard;