export class MonthView {
    constructor() {
        this.container = document.getElementById('month-view');
    }

    render() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const monthName = now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const monthProgress = (now.getDate() / daysInMonth) * 100;
        const fullWeeks = Math.floor(now.getDate() / 7);
        const remainingDays = now.getDate() % 7;
        const totalWeeks = Math.ceil(daysInMonth / 7);
        const weeksDecimal = now.getDate() / 7;

        let html = `
            <h2 style="text-align: center; margin-bottom: 40px; font-size: 1.5rem; font-weight: 700; text-transform: capitalize; letter-spacing: 0.05em;">${monthName}</h2>
            
            <div style="display: flex; gap: 60px; align-items: flex-start; justify-content: center; flex-wrap: wrap; margin-bottom: 60px;">
                <div class="circular-progress">
                    <svg width="220" height="220">
                        <circle class="circle-bg" cx="110" cy="110" r="100"></circle>
                        <circle class="circle-progress" cx="110" cy="110" r="100" 
                                stroke-dasharray="${2 * Math.PI * 100}"
                                stroke-dashoffset="${2 * Math.PI * 100 * (1 - monthProgress / 100)}"></circle>
                    </svg>
                    <div class="circle-text">
                        <div class="circle-value">${monthProgress.toFixed(0)}%</div>
                        <div class="circle-label">del mes</div>
                    </div>
                </div>

                <div class="stat-display" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                    <div class="stat-item">
                        <div class="stat-value">${now.getDate()}</div>
                        <div class="stat-label">días transcurridos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${daysInMonth - now.getDate()}</div>
                        <div class="stat-label">días restantes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${weeksDecimal.toFixed(1)}</div>
                        <div class="stat-label">semanas transcurridas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${Math.ceil((daysInMonth - now.getDate()) / 7)}</div>
                        <div class="stat-label">semanas por venir</div>
                    </div>
                </div>
            </div>

            <div class="week-visualization" style="max-width: 700px; margin: 0 auto; grid-template-columns: repeat(7, 1fr); gap: 6px;">
                ${this.renderCalendar(currentYear, currentMonth, daysInMonth, now)}
            </div>
        `;

        this.container.innerHTML = html;
    }

    renderCalendar(year, month, daysInMonth, now) {
        const firstDay = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
        
        let html = '';
        
        // Day headers
        const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
        days.forEach(day => {
            html += `<div class="day-cell" style="font-weight: 700; background: #f5f5f5; border-color: #e0e0e0;">${day}</div>`;
        });

        // Empty cells before first day
        for (let i = 0; i < adjustedFirstDay; i++) {
            html += '<div class="day-cell" style="border: none; background: transparent;"></div>';
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            let className = 'day-cell';
            
            if (day < now.getDate()) {
                className += ' passed';
            } else if (day === now.getDate()) {
                className += ' today';
            }
            
            html += `<div class="${className}">${day}</div>`;
        }

        return html;
    }
}