export default function Render({children, condition}: {children: React.ReactNode, condition: boolean}) {
    if(condition)
    return(<>{children}</>);

    return null;
}