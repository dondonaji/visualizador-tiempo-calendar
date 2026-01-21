export class YearView {
    constructor() {
        this.container = document.getElementById('year-view');
    }

    render() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const yearStart = new Date(currentYear, 0, 1);
        const yearEnd = new Date(currentYear, 11, 31);
        const totalDays = Math.ceil((yearEnd - yearStart) / (1000 * 60 * 60 * 24)) + 1;
        const daysPassed = Math.ceil((now - yearStart) / (1000 * 60 * 60 * 24));
        const yearProgress = (daysPassed / totalDays) * 100;

        const daysRemaining = totalDays - daysPassed;
        const weeksRemaining = Math.floor(daysRemaining / 7);
        const weeksPassed = daysPassed / 7;

        let html = `
            <div style="display: flex; gap: 60px; align-items: flex-start; justify-content: center; flex-wrap: wrap; margin-bottom: 60px;">
                <div class="circular-progress">
                    <svg width="220" height="220">
                        <circle class="circle-bg" cx="110" cy="110" r="100"></circle>
                        <circle class="circle-progress" cx="110" cy="110" r="100" 
                                stroke-dasharray="${2 * Math.PI * 100}"
                                stroke-dashoffset="${2 * Math.PI * 100 * (1 - yearProgress / 100)}"></circle>
                    </svg>
                    <div class="circle-text">
                        <div class="circle-value">${yearProgress.toFixed(0)}%</div>
                        <div class="circle-label">del año ${currentYear}</div>
                    </div>
                </div>

                <div class="stat-display" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                    <div class="stat-item">
                        <div class="stat-value">${daysPassed}</div>
                        <div class="stat-label">días transcurridos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${daysRemaining}</div>
                        <div class="stat-label">días restantes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${weeksPassed.toFixed(1)}</div>
                        <div class="stat-label">semanas transcurridas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${weeksRemaining}</div>
                        <div class="stat-label">semanas restantes</div>
                    </div>
                </div>
            </div>

            <div class="year-grid">
        `;

        for (let month = 0; month < 12; month++) {
            const monthDate = new Date(currentYear, month, 1);
            const monthName = monthDate.toLocaleDateString('es-ES', { month: 'long' });
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            
            let monthProgress = 0;
            if (month < now.getMonth()) {
                monthProgress = 100;
            } else if (month === now.getMonth()) {
                monthProgress = (now.getDate() / daysInMonth) * 100;
            }

            const monthDaysPassed = (month === now.getMonth() ? now.getDate() : (month < now.getMonth() ? daysInMonth : 0));
            const weeksInMonth = monthDaysPassed / 7;

            html += `
                <div class="month-block ${month % 3 === 0 ? 'quarter-start' : ''}">
                    <div class="month-name">${monthName}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${monthProgress}%"></div>
                    </div>
                    <div class="progress-text">
                        ${monthProgress.toFixed(0)}% • ${weeksInMonth.toFixed(1)} semanas
                    </div>
                    <div class="week-visualization">
                        ${this.renderDayBlocks(currentYear, month, daysInMonth, now)}
                    </div>
                </div>
            `;
        }

        html += '</div>';

        this.container.innerHTML = html;
    }

    renderDayBlocks(year, month, daysInMonth, now) {
        let blocks = '';
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            let className = 'day-cell';
            
            if (date < now && !(date.getDate() === now.getDate() && date.getMonth() === now.getMonth())) {
                className += ' passed';
            } else if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth()) {
                className += ' today';
            }
            
            blocks += `<div class="${className}">${day}</div>`;
        }
        return blocks;
    }
}

