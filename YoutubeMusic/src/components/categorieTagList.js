import { getMoodandCategories } from "../services/service";

export const renderCategorieTagList = async () => {
    const mainEl = document.querySelector("#main");
    const exloreList = document.createElement("section");
    exloreList.id = "exloreList";
    mainEl.append(exloreList);
    const exloreListEl = document.querySelector("#exloreList");
    const requestMoodandCategories = await getMoodandCategories();
    console.log(requestMoodandCategories);
    const tagList = [
        ...requestMoodandCategories.categories,
        ...requestMoodandCategories.lines,
    ]
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
    console.log(tagList);

    exloreListEl.outerHTML = `
      <section class="flex flex-wrap md:flex-row  mb-6 mt-10">
            <h2 class="lg:text-5xl text-white font-bold mb-4">Tâm trạng và thể loại</h2>
            <div class="w-full flex flex-col flex-wrap gap-4 overflow-x-auto pb-10 lg:pb-8 scrollbar scroll-smooth scrollbar-thumb-gray-700 max-h-86">
                  ${tagList}     
            </div>
      </section>
    `;
};
