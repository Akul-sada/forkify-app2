import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) { 
            const btn = e.target.closest('.btn--inline');
            
            if(!btn) return
            const gotoPage = +btn.dataset.goto;
            
            handler(gotoPage);
        });
    }
    _generateMarkup() {
        const curPage = this._data.page;
      // Page 1 , there are other pages
      const numPages = Math.ceil(
        this._data.results.length / this._data.resultsPerPage
      );
      

      // Last Page

      if (curPage === 1 && numPages > 1) {
          return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
      }
      // Page 1 , there are No other pages
      if (curPage === numPages && numPages >1) {
        return `<button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
      }

      // Other Page
      if (curPage < numPages) {
        return `<button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
      }
      return `only 1 page`;
    }
}
export default new PaginationView();