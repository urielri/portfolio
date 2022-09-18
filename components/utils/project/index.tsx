import { _Project } from "interface";
import { FC, useEffect } from "react";
import Card from "../card";
import { projectFamily as projectAtom } from 'atoms'
import { useRecoilState } from "recoil";
interface Props {
    card: {
        loading: boolean,
        view: "complete" | "simple"
    },
    data: _Project,
}

const Project: FC<Props> = ({ card, data }) => {
    const [, setProject] = useRecoilState(projectAtom(data._id));
    useEffect(() => {
        setProject(data)
    }, []);
    return (
        <Card view={card.view} loading={card.loading} data={null} id={data._id} />
    )
}

export default Project