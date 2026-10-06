import { useState } from "react";
import "./App.css";
import { LikeButton } from "./components/LikeButton";
import { Header } from "./components/header";
import { StudentCard } from "./components/StudentCard";
import { SkillList } from "./components/SkillList";
export type Student = {
    name: string;
    age: number;
    className: string;
};
function App() {
    const title: string = "Hồ sơ sinh viên"; // string
    const [likes, setLikes] = useState<number>(0); // number
    const student: Student = {
        // object
        name: "Nguyễn Văn An",
        age: 20,
        className: "WEB-K12",
    };
    const skills: string[] = ["HTML", "CSS", "JavaScript", "React"]; // array
    const handleLike = () => setLikes((prev) => prev + 1); // function

    return (
        <>
            <Header title={title} />
            <StudentCard student={student} />
            <SkillList skillList={skills} />
            <LikeButton likes={likes} onLike={handleLike} />
        </>
    );
}

export default App;
