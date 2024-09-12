import "./playAnimation.scss"
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL } from "../../requests";

const PlayAnimation = () => {

	let history = useHistory();
	const soundRef = useRef(null);
	const vidRef = useRef(null);
	const handleTadum = () => {
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

	const handleVideo = () => {
		vidRef.current.currentTime = 0;
		vidRef.current.play();
	}
	const [show, setShow] = useState(false);
	// handleTadum();

	useEffect(() => {
		handleTadum();
		setTimeout(() => {
			history.push('/browse')
		}, 42000000)
		setTimeout(function () {
			setShow(true)
			handleVideo()
		}.bind(this), 4200);
	}, [history]);


	return (
		<div className='PlayAnimation__wrp'>
			<>
				<audio ref={soundRef} src={TADUM_SOUND_URL} />
				<span className="PlayAnimation__text">
					FAKEFLIX
				</span>
			</>
			<div className={show ? "PlayVideo__wrp PlayVideo__wrp--show" : "PlayVideo__wrp"}>
				<video ref={vidRef} controls className="PlayVideo" src="/video1.mp4"></video>
			</div>
		</div>
	)
}

export default PlayAnimation
