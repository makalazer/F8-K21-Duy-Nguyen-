import { useState } from "react";

type Tag = "post" | "saved" | "video";
const useProfileAction = () => {
    const [currentTag, setCurrentTag] = useState<Tag>("post");

    return { currentTag, setCurrentTag };
};

export default useProfileAction;
