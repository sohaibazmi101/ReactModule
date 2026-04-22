import { useEffect, useState } from "react";
import "../styles/home.css";
function Home() {
    const words = [
        "Images...",
        "Videos...",
        "Text...",
        "Voice...",
    ];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];
        let timeout;
        if(!isDeleting){
            timeout = setTimeout(() => {
                setText(currentWord.substring(0, text.length + 1));
            }, 200);
        }else{
            timeout = setTimeout(() => {
                setText(currentWord.substring(0, text.length - 1));
            }, 50);
        }
        if(!isDeleting && text === currentWord){
            setTimeout(() => setIsDeleting(true), 1500);
        }
        if(isDeleting && text === ""){
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
        }
        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);

    return (
        <div className="home">
            <div className="banner">
                <img src="/banner.jpg" alt="Banner" className="banner-img" />
                <div className="banner-content">
                    <h1>Welcome to IntelliHub</h1>
                    <h2 className="typing">Generate <span>{text}</span></h2>
                    <h1>Smart AI tools in one place</h1>
                    <p>Manage Task, boost productivity, and simplify your workflow, all in one place with hands-on experienced tools of modern AI.</p>
                </div>
            </div>

            <div className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="cards">
                        <h3>Text Generation</h3>
                        <img src="/banner.jpg" alt="banner" />
                        <p>Generate Text with AI using Promts</p>
                    </div>
                    <div className="cards">
                        <h3>Image Generation</h3>
                        <img src="/banner.jpg" alt="banner" />
                        <p>Generate Images with AI using Promts</p>
                    </div>
                    <div className="cards">
                        <h3>Video Generation</h3>
                        <img src="/banner.jpg" alt="banner" />
                        <p>Generate Videos with AI using Promts</p>
                    </div>
                    <div className="cards">
                        <h3>Voice Generation</h3>
                        <img src="/banner.jpg" alt="banner" />
                        <p>Generate Voice with AI using Promts</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;