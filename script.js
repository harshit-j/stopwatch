'use strict';

	const time = document.querySelector('#time');
	const start_btn = document.querySelector('#start');
	const stop_btn = document.querySelector('#stop');
	const split_btn = document.querySelector('#split');
	const reset_btn = document.querySelector('#reset');
	const split_table = document.querySelector('#details tbody');
	let h, m, s, mm, interval, started = false, started_time, current, paused_gap = 0, split_adjust = 0, paused_time, temp, split_start, difference, running_total;

// to process and format elapsed time
	function delta(temp){
		mm = (temp % 1000);
		temp = (temp - mm)/ 1000;
		s = temp % 60;
		temp = (temp - s ) / 60;
		m = temp % 60;
		h = (temp - m) /60;
		mm = mm.toString().slice(0,2);
		return (h > 9 ? h : '0'+ h) +':'+ (m > 9 ? m : '0'+ m) +':'+ (s > 9 ? s : '0'+ s) +'.'+ (mm > 9 ? mm : '0'+ mm);
	}
// to calculate elapsed time and update dom
	function timer(){
		current = Math.round(performance.now());

		if(paused_time) {
			temp = current - paused_time
			paused_gap += temp;
			split_adjust += temp;
			paused_time = 0;
		};

		temp = current - started_time - paused_gap;
		running_total = delta(temp);
		time.textContent = running_total;
	}

// to start stopwatch
	function start(){
		if(!started){
			started = true;
			started_time = started_time || Math.round(performance.now());
			split_start = split_start || started_time;
			interval = setInterval(timer,10);
		}
	}

// to pause stopwatch
	function stop(){
		clearInterval(interval);
		paused_time = current;
		started = false;
	}

//to record splits/laps
	function split(){
		if(started){
		difference = current - split_start - split_adjust;
		split_start = current;
		console.log(delta(current))
		split_adjust = 0;
		split_table.innerHTML += `<tr><td>${delta(difference)}</td> <td>${running_total}</td> </tr>`
		}
	}

// to reset stopwatch
	function reset(){
		stop();
		started_time = paused_gap = paused_time = current = split_start = 0, split_table.innerHTML = '';
		time.textContent = '00:00:00.00';
	}

start_btn.addEventListener('click',start);
stop_btn.addEventListener('click',stop);
split_btn.addEventListener('click',split);
reset_btn.addEventListener('click',reset);





