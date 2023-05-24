import styled from "styled-components";

const MessageLayout = styled.div`
    margin-left: 60px;
    margin-top: 60px;
`;

const MessageTitle = styled.span`
    display: block;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

interface MessageProps {
    title: string;
    text: string;
    color?: "normal" | "red" | undefined;
}

const Message = ({title, text, color}: MessageProps) => {
    const setColor = (color: "normal" | "red" | undefined) => {
        if (color !== undefined) {
            switch (color) {
                case "normal": return "#000000";
                case "red": return "#FF0000";
            }
        } else {
            return "#000000";
        }
    }
    return (
        <MessageLayout style={{color: setColor(color)}}>
            <MessageTitle>{title}</MessageTitle>
            {text}
        </MessageLayout>
    )
};

export default Message;