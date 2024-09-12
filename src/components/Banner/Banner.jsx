import "./banner.scss";
import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";

const Banner = ({ type }) => {
	let selector;
	switch (type) {
		case "movies":
			selector = selectTrendingMovies;
			break;
		case "series":
			selector = selectNetflixSeries;
			break;
		default:
			selector = selectNetflixMovies;
			break;
	}

	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	const oldFinalData = results[randomize(results)];
	const finalData = {
		"adult": false,
		"backdrop_path": "test1.jpg",
		"genre_ids": oldFinalData?.genre_ids,
		"id": 63333,
		"origin_country": [
			"GB"
		],
		"original_language": "en",
		"original_name": "The Quest for the Perfect Ring",
		"overview": "A traveller peruses the country in search of the perfect proposal. Encountering hardships, peril, and a host of strange people, will he find the answers he's been looking for?",
		"popularity": 288.445,
		"poster_path": "/8eJf0hxgIhE6QSxbtuNCekTddy1.jpg",
		"first_air_date": "2015-10-10",
		"name": "The Quest for the Perfect Ring",
		"vote_average": 8.262,
		"vote_count": 1679,
	}
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	const description = truncate(finalData?.overview, 150);
	const dispatch = useDispatch();

	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	console.log(myData);
	console.log(finalData);

	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					test={BASE_IMG_URL}
					className={"Banner"}
					style={{
						backgroundImage: `url(${finalData?.backdrop_path})`,
						backgroundPosition: "center"
					}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);
