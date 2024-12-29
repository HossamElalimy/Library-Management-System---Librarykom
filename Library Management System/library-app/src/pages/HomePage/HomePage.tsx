interface HomePageProps{
    displayLogin: boolean
}


export default function HomePage(props:HomePageProps):JSX.Element{
    return(
        <div className="page">
            Home Page
            {props.displayLogin ? <p>Display The Login Form</p>: <></>}
        </div>
    )
}