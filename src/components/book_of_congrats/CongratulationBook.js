import React, { useEffect } from "react";
import "./book.scss";
import main_photo from "../../images/main_photo.jpg";
import dance from "../../images/dance.jpg";
import classNames from "classnames";
import audio from "../../dich.mp3";

const music = new Audio(audio);

const CongratulationBook = ({ isOpen, setOpen, setActive }) => {
	useEffect(() => {
		if (isOpen) {
			music.play();
		} else {
			music.pause();
			music.load();
		}
	}, [isOpen]);

	return (
		<div className="book">
			<div
				className={classNames("card", { "card--open": isOpen })}
				onClick={() => {
					if (!isOpen) setActive(true);
					setOpen(!isOpen);
				}}
			>
				<div className="card__image-box">
					<div className="card__bark" />
					<div className="card__image-box__img">
						<img src={main_photo} alt="Arslanbek" />
					</div>
					<h3 className="card__image-box__text">Нажми чтобы разбудить арслана</h3>
				</div>
				<div className="details">
					<h4 className="color1">Арслан, родной, бактылуу бол</h4>
					<h4 className="color2 margin">С днем рождения !!!</h4>
					<div className="image">
						<img src={dance} alt=""/>
					</div>
					<div className="text">
						<br />
						<br />
						<br />
						<p className="text-right">С днем рождения, Арсик!</p>
						<p className="text-right">От Dev Team ♥</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CongratulationBook;
