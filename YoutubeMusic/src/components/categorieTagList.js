export const renderCategorieTagList = async (data) => {
    const { tagList, title } = data;
    const mainEl = document.querySelector("#main");
    const exloreList = document.createElement("section");
    exloreList.id = "exloreList";
    mainEl.append(exloreList);
    const exloreListEl = document.querySelector("#exloreList");
    const tagListEl = tagList
        .map((item) => {
            return `
             <a href="/categories/${item.slug}" id="${item.id}"  class="max-w-64 min-w-48 h-12 rounded-lg flex items-center text-white  text-sm font-semibold cursor-pointer bg-[#292929]">
                        <div style="background-color: ${item.color};" class="h-full w-2 rounded-l-[999px] rounded-tr-[30px] rounded-br-[30px]"></div>
                        <div class="w-full flex-1 flex items-center justify-center px-2 truncate">
                        ${item.name}
                        </div>
            </a>
      `;
        })
        .join("");

    exloreListEl.outerHTML = `
      <section class="flex flex-wrap md:flex-row  mb-6 mt-10">
            <h2 class="lg:text-5xl text-white font-bold mb-4">${title}</h2>
            <div class="w-full flex flex-col flex-wrap gap-4 overflow-x-auto pb-10 lg:pb-8 scrollbar scroll-smooth scrollbar-thumb-gray-700 max-h-86">
                  ${tagListEl}     
            </div>
      </section>
    `;
};
