import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../Pagination.vue';

describe('Pagination', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly with given props', () => {
        const wrapper = mount(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 5,
            },
        });

        const pageItems = wrapper.findAll('.page-item');
        expect(pageItems.length).toBe(3);
        expect(pageItems[1].find('.page-link').text()).toBe('1 / 5');
    });

    it('emits "prevPage" event when Previous button is clicked', async () => {
        const wrapper = mount(Pagination, {
            props: {
                currentPage: 2,
                totalPages: 5,
            },
        });

        await wrapper.findAll('.page-link')[0].trigger('click');
        expect(wrapper.emitted().prevPage).toBeTruthy();
    });

    it('emits "nextPage" event when Next button is clicked', async () => {
        const wrapper = mount(Pagination, {
            props: {
                currentPage: 2,
                totalPages: 5,
            },
        });

        await wrapper.findAll('.page-link')[2].trigger('click');
        expect(wrapper.emitted().nextPage).toBeTruthy();
    });

    it('disables Previous button when currentPage is 1', () => {
        const wrapper = mount(Pagination, {
            props: {
                currentPage: 1,
                totalPages: 5,
            },
        });

        const prevButton = wrapper.findAll('.page-item')[0];
        expect(prevButton.classes()).toContain('disabled');
    });

    it('disables Next button when currentPage is equal to totalPages', () => {
        const wrapper = mount(Pagination, {
            props: {
                currentPage: 5,
                totalPages: 5,
            },
        });

        const nextButton = wrapper.findAll('.page-item')[2];
        expect(nextButton.classes()).toContain('disabled');
    });
});
