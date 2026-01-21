export class WeekView {
    constructor() {
        this.container = document.getElementById('week-view');
    }

    render() {
        const now = new Date();
        const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // Monday = 0
        const weekProgress = ((dayOfWeek + 1) / 7) * 100;

        // Get week start (Monday)
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);

        const weeksDecimal = (dayOfWeek + 1) / 7;

        let html = `
            <h2 style="text-align: center; margin-bottom: 40px; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Semana Actual</h2>
            
            <div style="display: flex; gap: 60px; align-items: flex-start; justify-content: center; flex-wrap: wrap; margin-bottom: 60px;">
                <div class="circular-progress">
                    <svg width="220" height="220">
                        <circle class="circle-bg" cx="110" cy="110" r="100"></circle>
                        <circle class="circle-progress" cx="110" cy="110" r="100" 
                                stroke-dasharray="${2 * Math.PI * 100}"
                                stroke-dashoffset="${2 * Math.PI * 100 * (1 - weekProgress / 100)}"></circle>
                    </svg>
                    <div class="circle-text">
                        <div class="circle-value">${weekProgress.toFixed(0)}%</div>
                        <div class="circle-label">de la semana</div>
                    </div>
                </div>

                <div class="stat-display" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                    <div class="stat-item">
                        <div class="stat-value">${dayOfWeek + 1}</div>
                        <div class="stat-label">días transcurridos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${6 - dayOfWeek}</div>
                        <div class="stat-label">días restantes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${weeksDecimal.toFixed(2)}</div>
                        <div class="stat-label">semana actual</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${now.toLocaleDateString('es-ES', { weekday: 'long' })}</div>
                        <div class="stat-label">día actual</div>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; max-width: 900px; margin: 0 auto;">
                ${this.renderWeekDays(weekStart, now)}
            </div>
        `;

        this.container.innerHTML = html;
    }

    renderWeekDays(weekStart, now) {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        let html = '';

        // Calculate progress within today (0-100%)
        const minutesPassedToday = now.getHours() * 60 + now.getMinutes();
        const totalMinutesInDay = 24 * 60;
        const todayProgress = (minutesPassedToday / totalMinutesInDay) * 100;

        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);

            const isToday = date.toDateString() === now.toDateString();
            const isPast = date < now && !isToday;

            // Dynamic background style
            let bgStyle = '';
            if (isPast) {
                bgStyle = `background: #000; color: #fff;`;
            } else if (isToday) {
                // Gradient fill for today
                bgStyle = `
                    background: linear-gradient(to right, 
                        #000 ${todayProgress}%, 
                        #fafafa ${todayProgress}%);
                    color: #000;
                `;
                // Adjust text color if background is dark (optional, but good for contrast)
                if (todayProgress > 50) {
                    // Could add complex logic here, but keeping simple for now
                    // or use mixed-blend-mode for text if possible.
                    // Simpler approach: Just keep text black for now or mix-blend-mode.
                }
            } else {
                bgStyle = `background: #fafafa; color: #000;`;
            }

            // Inline styles for specificity
            const cellStyle = `
                border: 1px solid ${isToday ? '#000' : '#e0e0e0'}; 
                padding: 20px 12px; 
                text-align: center; 
                transition: all 0.2s; 
                ${bgStyle}
                ${isToday ? 'box-shadow: 0 0 0 2px #fff, 0 0 0 3px #000;' : ''}
                position: relative;
                overflow: hidden;
            `;

            // For "today", we might need a specific color fix for text over the black part.
            // Using mix-blend-mode on content is a clean trick:
            const contentStyle = isToday ? 'mix-blend-mode: difference; color: #fff;' : '';

            html += `
                <div style="${cellStyle}">
                    <div style="${contentStyle}">
                        <div style="font-weight: 700; margin-bottom: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.9;">${days[i]}</div>
                        <div style="font-size: 2rem; font-weight: 700; letter-spacing: -0.02em;">${date.getDate()}</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 8px; text-transform: uppercase;">${date.toLocaleDateString('es-ES', { month: 'short' })}</div>
                    </div>
                </div>
            `;
        }

        return html;
    }
}