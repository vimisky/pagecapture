$(document).ready(function() {
	
	chrome.system.cpu.getInfo(function cinfo(cpuInfo) {

		$('<tr><td>CPU内核数量</td><td>' + cpuInfo.numOfProcessors + '</td></tr>').appendTo($('table.cpuInfo tbody'));
		$('<tr><td>CPU Model 名称</td><td>' + cpuInfo.modelName + '</td></tr>').appendTo($('table.cpuInfo tbody'));
		$('<tr><td>CPU Arch</td><td>' + cpuInfo.archName + '</td></tr>').appendTo($('table.cpuInfo tbody'));

		$.each(cpuInfo.processors, function(index, val) {
			$('<tr class="success"><td colspan="2">第' + index + '个CPU内核信息</td></tr>').appendTo($('table.cpuInfo tbody'));
			$('<tr><td>CPU空闲线程</td><td>' + val.usage.idle + '</td></tr>').appendTo($('table.cpuInfo tbody'));
			$('<tr><td>CPU内核线程</td><td>' + val.usage.kernel + '</td></tr>').appendTo($('table.cpuInfo tbody'));
			$('<tr><td>CPU用户线程</td><td>' + val.usage.user + '</td></tr>').appendTo($('table.cpuInfo tbody'));
			$('<tr><td>CPU总线程数</td><td>' + val.usage.total + '</td></tr>').appendTo($('table.cpuInfo tbody'));
		});

	});
	chrome.system.memory.getInfo(function minfo(memoryInfo) {
		$('<tr><td>内存可用量</td><td>' + memoryInfo.availableCapacity + '</td></tr>').appendTo($('table.memInfo tbody'));
		$('<tr><td>内存总量</td><td>' + memoryInfo.capacity + '</td></tr>').appendTo($('table.memInfo tbody'));
	});
	
});