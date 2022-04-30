import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import sticker1 from "../../images/pack/1.png";
import sticker2 from "../../images/pack/2.png";
import sticker3 from "../../images/pack/3.png";
import sticker4 from "../../images/pack/4.png";
import sticker5 from "../../images/pack/5.png";
import sticker6 from "../../images/pack/6.png";
import sticker7 from "../../images/pack/7.png";
import sticker8 from "../../images/pack/8.png";
import sticker9 from "../../images/pack/9.png";
import sticker10 from "../../images/pack/10.png";
import sticker11 from "../../images/pack/11.png";
import sticker13 from "../../images/pack/13.png";
import sticker14 from "../../images/pack/14.png";
import sticker15 from "../../images/pack/15.png";
import sticker17 from "../../images/pack/17.png";
import sticker18 from "../../images/pack/18.png";
import sticker21 from "../../images/pack/21.png";
import sticker22 from "../../images/pack/22.png";
import sticker23 from "../../images/pack/23.png";
import sticker24 from "../../images/pack/24.png";
import sticker25 from "../../images/pack/25.png";

const stickers = [
	sticker1,
	sticker2,
	sticker3,
	sticker4,
	sticker5,
	sticker6,
	sticker7,
	sticker8,
	sticker9,
	sticker10,
	sticker11,
	sticker13,
	sticker14,
	sticker15,
	sticker17,
	sticker18,
	sticker21,
	sticker22,
	sticker23,
	sticker24,
	sticker25,
];

function getRandomImage() {
	const min = Math.ceil(0);
	const max = stickers.length;
	const randomIndex = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
	return stickers[randomIndex];
}

let Heart = function () {
	this.x = 0;
	this.y = 0;
	this.vy = 0;
	this.vx = 0;
	this.size = 0;
	this.flakeImg = sticker1;
	this.reset();
};

const FacesRain = ({ setActive, triggerCoords, fiesta }) => {
	const canvasRef = useRef(null);
	const skyRef = useRef(null);

	useEffect(() => {
		let particleMax = 40;
		const canvas = canvasRef.current;
		const sky = skyRef.current;
		let ctx = canvas.getContext("2d");
		let width = sky.clientWidth;
		let height = sky.clientHeight;
		let i = 0;
		let active = false;
		let hearts = [];
		let heart;

		canvas.style.position = "absolute";
		canvas.style.left = canvas.style.top = "0";

		Heart.prototype.reset = function () {
			this.x = Math.random() * width;
			this.y = Math.random() * -height;
			// const [triggerX, triggerY] = triggerCoords;
			// this.x = triggerX;
			// this.y = triggerY;
			this.vy = 1 + Math.random() * 3;
			this.vx = 0.5 - Math.random();
			this.size = Math.random() * 20 + 90;
		};

		function generateSnowFlakes() {
			hearts = [];
			for (i = 0; i < particleMax; i++) {
				heart = new Heart();
				heart.reset();
				const flakeImg = new Image();
				flakeImg.src = getRandomImage();
				heart.flakeImg = flakeImg;
				hearts.push(heart);
			}
		}

		generateSnowFlakes();

		function update() {
			ctx.clearRect(0, 0, width, height);

			if (hearts.every((item) => item.y > height)) {
				setActive(false);
				return;
			}

			for (i = 0; i < hearts.length; i++) {
				heart = hearts[i];
				heart.y += heart.vy;
				heart.x += heart.vx;

				ctx.globalAlpha = heart.o;
				ctx.beginPath();

				// const a =
				ctx.drawImage(
					heart.flakeImg,
					heart.x,
					heart.y,
					heart.size,
					heart.size * (heart.flakeImg.naturalHeight / heart.flakeImg.naturalWidth)
				);
				console.log(heart.flakeImg);
				console.log(heart.flakeImg.width);
				console.log(heart.flakeImg.height);
				console.log("________");

				ctx.closePath();
				ctx.fill();
			}

			window.requestAnimFrame(update);
		}

		function onResize() {
			width = sky.clientWidth;
			height = sky.clientHeight;
			canvas.width = width;
			canvas.height = height;

			let wasActive = active;
			active = true;

			if (!wasActive && active) {
				window.requestAnimFrame(update);
			}
		}

		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})();

		onResize();
		window.addEventListener("resize", onResize, false);
		return () => {
			ctx.clearRect(0, 0, width, height);
			window.removeEventListener("resize", onResize, false);
		};
	}, [setActive]);
	return (
		<section className="sky" onClick={(event) => console.log(event.clientX + " ", event.clientY)} ref={skyRef}>
			<canvas ref={canvasRef} />
		</section>
	);
};

FacesRain.propTypes = {
	setActive: PropTypes.func.isRequired,
};

export default FacesRain;
