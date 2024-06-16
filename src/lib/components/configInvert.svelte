<script lang="ts">
	import { type ConfigLatest } from '../config/latest';
	import { getTimes } from 'suncalc';

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
				errorCode: GeolocationPositionError['code'];
		  } = {
		status: 'default'
	};

	let latitudeInput: HTMLInputElement;
	let longitudeInput: HTMLInputElement;

	let sun: { sunrise: Date; sunset: Date } | undefined;

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
			const times = getTimes(new Date(), latitude, longitude);
			sun = { sunrise: times.sunrise, sunset: times.sunset };
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
					errorCode: error.code
				};
			}
		);
	};
</script>

<h2>Inversion</h2>

<div class="labels">
	<label>
		<input type="radio" bind:group={method} value={'off'} />
		Off
	</label>

	<label>
		<input type="radio" bind:group={method} value={'on'} />
		On
	</label>

	<div>
		<label>
			<input type="radio" bind:group={method} value={'auto_coordinates'} />
			Sunset/sunrise
		</label>
		{#if method === 'auto_coordinates'}
			<div class="geoControls">
				<button on:click={onGeolocate} disabled={geoStatus.status === 'loading'}
					>Use current location</button
				>

				{#if geoStatus.status === 'loading'}
					<div>Loading (this can take a minute)</div>
				{/if}
				{#if geoStatus.status === 'error'}
					<div>
						{#if geoStatus.errorCode === GeolocationPositionError.PERMISSION_DENIED}
							Permission was denied
						{:else if geoStatus.errorCode === GeolocationPositionError.POSITION_UNAVAILABLE}
							Location is unavailable
						{:else if geoStatus.errorCode === GeolocationPositionError.TIMEOUT}
							Location request timed out
						{:else}
							Could not get location
						{/if}
					</div>
				{/if}

				<label>
					Latitude:
					<input
						type="number"
						step="any"
						style="width: 6em"
						bind:this={latitudeInput}
						bind:value={latitude}
						min={-90}
						max={90}
					/>
				</label>

				<label>
					Longitude:
					<input
						type="number"
						step="any"
						style="width: 6em"
						bind:this={longitudeInput}
						bind:value={longitude}
						min={-180}
						max={180}
					/>
				</label>

				{#if sun !== undefined}
					<div>
						Sunrise at {Intl.DateTimeFormat(navigator.language, {
							dateStyle: undefined,
							timeStyle: 'short'
						}).format(sun.sunrise)}, sunset at {Intl.DateTimeFormat(navigator.language, {
							dateStyle: undefined,
							timeStyle: 'short'
						}).format(sun.sunset)}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.labels {
		display: flex;
		align-items: start;
		gap: 1em;
	}

	.geoControls {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.5em;
		margin-top: 0.5em;
	}
</style>
