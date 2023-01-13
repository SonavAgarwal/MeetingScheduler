// const emojiList =
// 	"🐵 🐺 🦊 🐒 🦍 🐶 🐕 🦮 🐕 🦝 🐱 🐈 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🐃 🐄 🐷 🐖 🐗 🐽 🦓 🦌 🐮 🐂 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐿 🦔 🦇 🐻 🐨 🦡 🐾 🦃 🐔 🐓 🐼 🦥 🦦 🦘 🐣 🐤 🐦 🐧 🕊 🦅 🦆 🦢 🦉 🦚 🦜 🐸 🐢 🦎 🐲 🐉 🦕 🦩 🐡 🦈 🐙 🐚 🦖 🐳 🐬 🐟 🐠 🦋 🐛 🐝 🐞 🦗 🕷 🕸 💐 🌸 💮 🏵 🌹 🥀 🌺 🦟 🦠 🌿 🌻 🌼 🌷 🌱 🌲 🌳 🌴 🌵 🌾 ☘️ 🍀 🍁 🍂 🍃 🪸 🪷 🦭 🪙 🪳 🦬 🦫 🪰 🪱 🪲 🦣 🪶 🪹 🪴 🪺 🐋 🐍 🐌 🦨 🦂 🐇 🐩 🐻 🦧 🐥 🐊 🐈 🐜".split(
// 		" "
// 	);
const emojiList =
	"😺 🐵 🐒 🦍 🐶 🐕 🐩 🐺 🦊 🦝 🐱 🐈 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿 🦔 🦇 🐻 🐨 🐼 🦘 🦡 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊 🦅 🦆 🦢 🦉 🦚 🦜 🐸 🐊🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🐟 🐠 🐡 🦈 🐙 🐚 🦀 🦞 🦐 🦑 🐌 🦋 🐛 🐜 🐝 🐞 🦗 🕷 🦂 🦟".split(
		" "
	);

export function emojiFrom(str) {
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		let chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	hash = Math.abs(hash);
	return emojiList[hash % emojiList.length];
}
