type TTitleProps = {
	content: string
}

export const Title = (props: TTitleProps) => {
	return (
		<div className="">
			<h1>{props.content}</h1>
		</div>
	)
}
