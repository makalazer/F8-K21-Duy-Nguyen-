import type { Student } from "../App";

type StudentCardProps = {
    student: Student;
};

export const StudentCard = ({ student }: StudentCardProps) => {
    return (
        <div>
            <p>Tên : {student.name}</p>
            <p>Lớp : {student.className}</p>
            <p>Tuổi : {student.age}</p>
        </div>
    );
};
