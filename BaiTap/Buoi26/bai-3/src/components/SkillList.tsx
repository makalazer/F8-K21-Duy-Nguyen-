type SkillListProps = {
    skillList: string[];
};

export const SkillList = ({ skillList }: SkillListProps) => {
    return (
        <>
            <h2 style={{ marginTop: "20px" }}>Danh sách kỹ năng</h2>
            <ul
                style={{
                    textDecoration: "none",
                    listStyle: "none",
                    padding: "0",
                }}
            >
                {skillList.map((skil) => {
                    return <li>{skil}</li>;
                })}
            </ul>
        </>
    );
};
