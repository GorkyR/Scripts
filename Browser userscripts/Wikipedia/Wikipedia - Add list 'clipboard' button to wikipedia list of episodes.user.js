// ==UserScript==
// @name         Add list 'clipboard' button to wikipedia list of episodes
// @version      0.1
// @author       GorkyR
// @match        *://en.wikipedia.org/wiki/*
// @icon         https://www.google.com/s2/favicons?domain=wikipedia.org
// ==/UserScript==

(function() {
	'use strict';
	function array(collection) { let array = []; for(let element of collection) array.push(element); return array; }
	const list_icon_url = 'https://icons.iconarchive.com/icons/vexels/office/1024/clipboard-icon.png';
	function make_clipboard_button(click_handler) {
		 const button = document.createElement('button');
		 const image = document.createElement('img');
		 image.src = list_icon_url;
		 image.width = image.height = 18;
		 button.appendChild(image);
		 button.style.margin = '0 8px';
		 button.style.padding = '0 2px';
		 button.onclick = click_handler;
		 return button;
	}
	var headlined_episode_tables = array(document.getElementsByClassName('wikiepisodetable'))
	.map(et => {
		 const table_parent = et.parentElement;
		 const table_parent_children = array(table_parent.children);
		 const table_index_into_parent = table_parent_children.indexOf(et);
		 const indexed_headlines = array(table_parent.getElementsByClassName('mw-headline'))
		 .map(h => ({ index: table_parent_children.indexOf(h.parentElement), headline: h }))
		 .filter(ih => ih.index < table_index_into_parent);
		 return ({ season_headline: indexed_headlines[indexed_headlines.length - 1].headline, episode_table: et });
	});
	headlined_episode_tables.forEach(het => {
		 const episode_titles = array(het.episode_table.getElementsByTagName('tr'))
		 .map(row => array(row.getElementsByTagName('td')))
		 .filter(row_cells => row_cells.length > 1)
		 .map(row_cells => row_cells.find(cell => cell.innerText.trim()[0] === '"').innerText.split('\n')[0].split(' / ')[0])
		 .map(quoted_title => quoted_title.substr(1, quoted_title.length - 2))
		 .map(title => title.replace(':', ' -').replace(/\?$/, '').replace(/\?/, ' '));
		 het.season_headline.appendChild(make_clipboard_button(function() {
			  window.navigator.clipboard.writeText(episode_titles.join('\n'));
			  console.log(het.season_headline.innerText);
			  console.log(episode_titles.join('\n'));
		 }));
	});
})();