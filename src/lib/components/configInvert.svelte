<script lang="ts">
	import { type ConfigLatest } from '$lib/config/latest';

	export let inversion: ConfigLatest['inversion'];

	let method = inversion.method;

	let latitude = inversion.method === 'auto_coordinates' ? inversion.lat : 0;
	let longitude = inversion.method === 'auto_coordinates' ? inversion.long : 0;
	let geoStatus:
		| {
				status: 'default';
		  }
		| {
				status: 'loading';
		  }
		| {
				status: 'error';
				error: GeolocationPositionError;
		  } = {
		status: 'default'
	};

	let latitudeInput: HTMLInputElement;
	let longitudeInput: HTMLInputElement;

	$: {
		console.log({
			method,
			latitude,
			longitude,
			latval: latitudeInput?.validity.valid
		});
		if (method === 'off') {
			inversion = {
				method: 'off'
			};
		} else if (method === 'on') {
			inversion = {
				method: 'on'
			};
		} else if (
			method === 'auto_coordinates' &&
			typeof latitude === 'number' &&
			typeof longitude === 'number' &&
			latitudeInput?.validity.valid &&
			longitudeInput?.validity.valid
		) {
			inversion = {
				method: 'auto_coordinates',
				lat: latitude,
				long: longitude
			};
		}
	}

	const onGeolocate = () => {
		geoStatus = {
			status: 'loading'
		};
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				latitude = pos.coords.latitude;
				longitude = pos.coords.longitude;
				geoStatus = {
					status: 'default'
				};
			},
			(error) => {
				geoStatus = {
					status: 'error',
					error
				};
			}
		);
	};
</script>

<label>
	<input type="radio" bind:group={method} value={'off'} />
	Off
</label>

<label>
	<input type="radio" bind:group={method} value={'on'} />
	On
</label>

<label>
	<input type="radio" bind:group={method} value={'auto_coordinates'} />
	Location
</label>

{#if method === 'auto_coordinates'}
	<button on:click={onGeolocate}>Use current location</button>
	<div>
		{#if geoStatus.status === 'loading'}
			Loading
		{/if}
		{#if geoStatus.status === 'error'}
			{geoStatus.error}
		{/if}
	</div>
	<label>
		Latitude:
		<input
			type="number"
			step="0.001"
			bind:this={latitudeInput}
			bind:value={latitude}
			min={-90}
			max={90}
		/>
	</label>

	<label>
		Longitude:
		<input type="number" bind:this={longitudeInput} bind:value={longitude} min={-180} max={180} />
	</label>
{/if}
