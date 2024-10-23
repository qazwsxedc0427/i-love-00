let alarmTime = null;
let playCount = 0; // 播放计数

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // 检查是否到达闹钟时间
    if (alarmTime === `${hours}:${minutes}:${seconds}`) {
        triggerAlarm();
    }
}

function setAlarm() {
    const inputTime = document.getElementById('alarmTime').value;
    if (inputTime) {
        alarmTime = inputTime;
        document.getElementById('alarmMessage').textContent = `綾綾正在趕往戰場`;
    } else {
        alert('Please enter a valid time.');
    }
}

function triggerAlarm() {
    document.getElementById('alarmMessage').textContent = '嗚嚕嚕嚕嚕~'; // 修改提示信息
    const video = document.getElementById('alarmVideo');
    video.style.display = 'block'; // 显示视频
    video.playbackRate = 1.5; // 设置播放速度为1.5倍
    video.volume = 1.0; // 设置音量为正常值
    video.currentTime = 0; // 重置视频到开头
    playCount = 0; // 重置播放计数

    // 取消静音并播放视频
    video.muted = false; // 取消静音
    playVideo(video); // 播放视频
}

// 播放视频并处理播放结束事件
function playVideo(video) {
    video.play().catch((error) => {
        console.error('Error playing video:', error); // 捕获播放错误
    }); // 播放视频
    video.onended = function() {
        playCount++; // 增加播放计数
        if (playCount < 3) {
            video.currentTime = 0; // 重置视频到开头
            playVideo(video); // 再次播放视频
        } else {
            video.style.display = 'none'; // 隐藏视频
            video.currentTime = 0; // 重置视频到开头
            document.getElementById('alarmMessage').textContent = ''; // 清空提示信息
            video.muted = true; // 再次静音
        }
    };
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
updateTime();
