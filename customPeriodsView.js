export class CustomPeriodsView {
    constructor() {
        this.container = document.getElementById('custom-view');
        this.periods = [
            { name: '3 días', days: 3 },
            { name: '5 días', days: 5 },
            { name: '15 días', days: 15 },
            { name: '21 días', days: 21 },
            { name: '30 días', days: 30 },
            { name: '90 días', days: 90 },
            { name: '12 semanas', days: 84 },
            { name: '6 meses', days: 180 }
        ];
    }

    render() {
        const now = new Date();

        let html = `
            <h2 style="text-align: center; margin-bottom: 40px; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Contador de Períodos</h2>
            <div class="custom-periods">
        `;

        this.periods.forEach(period => {
            const weeksDecimal = period.days / 7;

            html += `
                <div class="period-card">
                    <div class="period-title">${period.name}</div>
                    <div class="circular-progress" style="width: 160px; height: 160px;">
                        <svg width="160" height="160">
                            <circle class="circle-bg" cx="80" cy="80" r="70"></circle>
                            <circle class="circle-progress" cx="80" cy="80" r="70" 
                                    stroke-dasharray="${2 * Math.PI * 70}"
                                    stroke-dashoffset="0"></circle>
                        </svg>
                        <div class="circle-text">
                            <div class="circle-value" style="font-size: 1.5rem;">${period.days}</div>
                            <div class="circle-label" style="font-size: 0.7rem;">días</div>
                        </div>
                    </div>
                    <div class="block-grid" style="margin-top: 20px; grid-template-columns: repeat(auto-fill, minmax(12px, 1fr));">
                        ${this.renderBlocks(period.days)}
                    </div>
                    <div style="margin-top: 12px; font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">
                        ${weeksDecimal.toFixed(1)} semanas
                    </div>
                </div>
            `;
        });

        html += '</div>';
        this.container.innerHTML = html;
    }

    renderBlocks(totalDays) {
        let html = '';
        const blocksToShow = Math.min(totalDays, 100);

        for (let i = 0; i < blocksToShow; i++) {
            html += `<div class="time-block"></div>`;
        }

        return html;
    }
}

