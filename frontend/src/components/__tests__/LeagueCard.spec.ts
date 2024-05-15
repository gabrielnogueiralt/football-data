import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import LeagueCard from '../LeagueCard.vue';
import type { Competition } from '../../types/football-data';

describe('LeagueCard', () => {
    const league: Competition = {
        id: 1,
        area: {
            id: 1,
            name: 'Europe',
            code: 'EUR',
            flag: 'flag-url',
        },
        name: 'Premier League',
        code: 'PL',
        type: 'LEAGUE',
        emblem: 'emblem-url',
        plan: 'TIER_ONE',
        currentSeason: {
            id: 1,
            startDate: '2023-08-12',
            endDate: '2024-05-12',
            currentMatchday: 1,
            winner: null,
        },
        numberOfAvailableSeasons: 1,
        lastUpdated: '2023-08-12',
    };

    const router = createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/teams/:id',
                name: 'teams',
                component: { template: '<div>Teams</div>' },
            },
        ],
    });

    it('renders correctly', () => {
        const wrapper = mount(LeagueCard, {
            props: { league },
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.find('.card-title').text()).toBe(league.name);
        expect(wrapper.find('.card-text').text()).toContain(league.area.name);
        expect(wrapper.find('.card-text').text()).toContain(`Start: ${league.currentSeason.startDate}`);
        expect(wrapper.find('.card-text').text()).toContain(`End: ${league.currentSeason.endDate}`);
    });

    it('navigates to league page on click', async () => {
        const routerPush = vi.spyOn(router, 'push');
        const wrapper = mount(LeagueCard, {
            props: { league },
            global: {
                plugins: [router],
            },
        });

        await wrapper.trigger('click');

        expect(routerPush).toHaveBeenCalledWith({ name: 'teams', params: { id: league.id } });
    });
});
