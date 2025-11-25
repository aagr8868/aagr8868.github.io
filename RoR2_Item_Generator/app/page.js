import LikeButton from './like-button';
import Items from './data/items.json';
 
function Header({ title }) {
	return <h1>{title ? title : 'Default title'}</h1>;
}

function GetRandomItem({rarity}) {
	var item_id = Math.floor(Math.random() * Items[rarity].length)
	return Items[rarity][item_id].name;
}

export default function HomePage() {
	const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
	return (
		<div>
			<Header title="Develop. Preview. Ship." />
			<ul>
				{names.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>
			<LikeButton />
			<p><GetRandomItem rarity="white" /></p>
		</div>
	);
}