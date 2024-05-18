<script>
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	import { reportService } from '$lib/services/report-service';
	import { generateByDay } from '$lib/services/report-utils';
	import { get } from 'svelte/store';
	import { currentSession, latestReport, subTitle } from '$lib/stores';

	let myChart;

	onMount(async () => {
		const chartDom = document.getElementById('main');
		myChart = echarts.init(chartDom);

		const reportList = await reportService.getReports(get(currentSession));
		const data = generateByDay(reportList); // Generate the data

		const option = {
			xAxis: {
				type: 'category',
				data: data.labels
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: data.datasets[0].values,
				type: 'line'
			}]
		};

		myChart.setOption(option);
	});
</script>

<div id="main" style="width: 1400px;height:400px;"></div>