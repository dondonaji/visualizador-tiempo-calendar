import { YearView } from './yearView.js';
import { MonthView } from './monthView.js';
import { WeekView } from './weekView.js';
import { CustomPeriodsView } from './customPeriodsView.js';

class TimeVisualizer {
    constructor() {
        this.currentMode = 'week';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.views = {
            year: new YearView(),
            month: new MonthView(),
            week: new WeekView(),
            custom: new CustomPeriodsView()
        };

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.updateCurrentDate();
        this.setupEventListeners();
        this.renderCurrentView();

        // Update every minute
        setInterval(() => {
            this.updateCurrentDate();
            this.renderCurrentView();
        }, 60000);

        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    }

    updateCurrentDate() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        document.querySelector('.current-date').textContent =
            now.toLocaleDateString('es-ES', options);
    }

    setupEventListeners() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.switchTheme(theme);
            });
        });
    }

    switchTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    switchMode(mode) {
        this.currentMode = mode;

        // Update buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Update views
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        document.getElementById(`${mode}-view`).classList.add('active');

        this.renderCurrentView();
    }

    renderCurrentView() {
        const view = this.views[this.currentMode];
        if (view) {
            view.render();
        }
    }
}

// Initialize the app
new TimeVisualizer();