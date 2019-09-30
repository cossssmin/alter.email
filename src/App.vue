<template>
  <div id="app" class="flex h-screen bg-gradient-maizzle p-4">
    <div class="flex flex-wrap w-full h-app">
      <div class="flex justify-between w-full mb-2">
        <h1 class="logo">
          <a href="https://alter.email" @click.prevent="openAbout()">
            <svg class="fill-current w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="M 17 0 C 13.101563 0 9.699219 2.5 8.5 6 L 9 6 C 9.601563 6 10.09375 6.09375 10.59375 6.09375 C 11.695313 3.695313 14.199219 2 17 2 C 20.898438 2 24 5.101563 24 9 C 24 11.800781 22.304688 14.304688 19.90625 15.40625 C 20.007813 15.90625 20 16.5 20 17 L 20 17.5 C 23.5 16.300781 26 12.898438 26 9 C 26 4 22 0 17 0 Z M 20.5 5.5 L 15.09375 6.3125 L 16.6875 7.875 L 9.375 15.1875 L 7.8125 13.59375 L 7.09375 18.90625 L 12.40625 18.1875 L 10.8125 16.625 L 18.125 9.3125 L 19.6875 10.90625 Z M 9 8 C 4 8 0 12 0 17 C 0 22 4 26 9 26 C 14 26 18 22 18 17 C 18 15.398438 17.605469 13.988281 16.90625 12.6875 L 15.40625 14.1875 C 15.804688 14.988281 16 16 16 17 C 16 20.898438 12.898438 24 9 24 C 5.101563 24 2 20.898438 2 17 C 2 13.101563 5.101563 10 9 10 C 10 10 11.011719 10.195313 11.8125 10.59375 L 13.3125 9.09375 C 12.011719 8.394531 10.601563 8 9 8 Z"></path></svg>
            alter.email
          </a>
        </h1>
        <button
          @click="handleSubmit()"
          class="btn-process"
          :class="{['disabled']: html.original.length < 1, 'busy': altering}"
        >
          {{ altering ? 'Altering Email...' : 'Alter Email &rarr;' }}
        </button>
      </div>
      <div class="w-full h-full">
        <div class="flex">
          <ul class="flex h-10 font-semibold w-1/2 text-white" :style="panelWidths.input > 0 ? `width:${panelWidths.input}px;` : ''">
            <li @click="activeInputTab = 'html'" :class="[activeInputTab == 'html' ? 'bg-white text-gray-800 cursor-default' : 'cursor-pointer hover:text-gray-200']" class="inline-block rounded-t py-2 px-6">Input</li>
            <li @click="activeInputTab = 'transformers'" :class="[activeInputTab == 'transformers' ? 'bg-white text-gray-800 cursor-default' : 'cursor-pointer hover:text-gray-200']" class="inline-block rounded-t py-2 px-6">Transformers</li>
            <li class="flex items-center">
              <span v-show="html.original" v-cloak class="flex items-center flex-none px-6 text-sm text-white">
                {{ originalFormattedFileSizeUnix }}
                <a href="https://github.com/hteumeuleu/email-bugs/issues/41" class="ml-4" target="_blank" rel="nofollow noopener">
                  <svg class="w-4 align-bottom" v-show="originalFileSizeUnix > 82000 && originalFileSizeUnix < 104453" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M501.461 383.799L320.501 51.401C306.7 28.6 282.7 14.8 256 14.8s-50.7 13.8-64.501 36.601L10.539 383.799C-3.259 407.501-3.56 435.701 9.941 459.4c13.499 23.699 37.798 37.8 65.099 37.8h361.92c27.301 0 51.601-14.101 65.099-37.8 13.501-23.699 13.2-51.899-.598-75.601z" fill="#495a79"/><path d="M502.059 459.4c-13.499 23.699-37.798 37.8-65.099 37.8H256V14.8c26.7 0 50.7 13.801 64.501 36.601L501.461 383.8c13.798 23.701 14.099 51.901.598 75.6z" fill="#42516d"/><path d="M475.661 399.1L294.699 66.699C286.601 52.9 271.901 44.8 256 44.8s-30.601 8.101-38.699 21.899L36.339 399.1c-8.399 14.101-8.399 31.199-.298 45.3 8.099 14.399 22.798 22.8 39 22.8h361.92c16.201 0 30.901-8.401 39-22.8 8.099-14.101 8.099-31.199-.3-45.3z" fill="#ffde33"/><path d="M475.96 444.4c-8.099 14.399-22.798 22.8-39 22.8H256V44.8c15.901 0 30.601 8.101 38.699 21.899L475.661 399.1c8.399 14.101 8.399 31.199.299 45.3z" fill="#ffbc33"/><g fill="#495a79"><path d="M256 437.2c-16.538 0-30-13.462-30-30s13.462-30 30-30 30 13.462 30 30-13.462 30-30 30zM286 317.2c0 16.538-13.462 30-30 30s-30-13.462-30-30v-150c0-16.538 13.462-30 30-30s30 13.462 30 30v150z"/></g><g fill="#42516d"><path d="M286 407.2c0-16.538-13.462-30-30-30v60c16.538 0 30-13.462 30-30zM286 317.2v-150c0-16.538-13.462-30-30-30v210c16.538 0 30-13.462 30-30z"/></g></svg>
                  <svg class="w-4 align-bottom" v-show="originalFileSizeUnix > 104453" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M501.449 368.914L320.566 66.207C306.751 43.384 282.728 29.569 256 29.569s-50.752 13.815-64.567 36.638L10.55 368.914c-13.812 23.725-14.113 51.954-.599 75.678 13.513 23.723 37.836 37.838 65.165 37.838h361.766c27.329 0 51.653-14.115 65.165-37.838 13.516-23.724 13.215-51.953-.598-75.678z" fill="#e50027"/><path d="M502.049 444.592c-13.513 23.723-37.836 37.838-65.165 37.838H256V29.57c26.727 0 50.752 13.815 64.567 36.638L501.45 368.915c13.812 23.724 14.113 51.953.599 75.677z" fill="#c1001f"/><path d="M75.109 452.4c-16.628 0-30.851-8.27-39.063-22.669-8.211-14.414-8.065-31.087.469-45.72L217.23 81.549c8.27-13.666 22.816-21.951 38.769-21.951s30.5 8.284 38.887 22.157l180.745 302.49c8.388 14.4 8.534 31.072.322 45.485-8.211 14.4-22.435 22.669-39.063 22.669H75.109v.001z" fill="#fd003a"/><path d="M436.891 452.4c16.628 0 30.851-8.27 39.063-22.669 8.211-14.414 8.065-31.087-.322-45.485L294.886 81.754c-8.388-13.871-22.933-22.157-38.887-22.157V452.4h180.892z" fill="#e50027"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03s-30.031-13.514-30.031-30.03V152.095c0-16.517 13.514-30.031 30.031-30.031s30.03 13.514 30.03 30.031z" fill="#e1e4fb"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03V122.064c16.516 0 30.03 13.514 30.03 30.031z" fill="#c5c9f7"/><path d="M256 332.278c-24.926 0-45.046 20.119-45.046 45.046 0 24.924 20.119 45.046 45.046 45.046s45.046-20.121 45.046-45.046c0-24.926-20.121-45.046-45.046-45.046z" fill="#e1e4fb"/><path d="M301.046 377.323c0 24.924-20.119 45.046-45.046 45.046v-90.091c24.925 0 45.046 20.12 45.046 45.045z" fill="#c5c9f7"/></svg>
                </a>
              </span>
            </li>
          </ul>
          <ul class="flex h-10 font-semibold w-1/2 text-white ml-1 items-center" :style="panelWidths.output > 0 ? `width:${panelWidths.output}px;` : ''">
            <li @click="activeOutputTab = 'html'" :class="[activeOutputTab == 'html' ? 'bg-white text-gray-800 cursor-default' : 'cursor-pointer hover:text-gray-200']" class="inline-block rounded-t py-2 px-6">Output</li>
            <li @click="activeOutputTab = 'preview'" :class="[activeOutputTab == 'preview' ? 'bg-white text-gray-800 cursor-default' : 'cursor-pointer hover:text-gray-200']" class="inline-block rounded-t py-2 px-6">Preview</li>
            <li class="flex items-center">
              <span v-show="html.transformed" v-cloak class="flex items-center flex-none px-6 text-sm text-white">
                {{ transformedFormattedFileSizeUnix }}
                <a href="https://github.com/hteumeuleu/email-bugs/issues/41" class="ml-4" target="_blank" rel="nofollow noopener">
                  <svg class="w-4 align-bottom" v-show="transformedFileSizeUnix > 82000 && transformedFileSizeUnix < 104453" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M501.461 383.799L320.501 51.401C306.7 28.6 282.7 14.8 256 14.8s-50.7 13.8-64.501 36.601L10.539 383.799C-3.259 407.501-3.56 435.701 9.941 459.4c13.499 23.699 37.798 37.8 65.099 37.8h361.92c27.301 0 51.601-14.101 65.099-37.8 13.501-23.699 13.2-51.899-.598-75.601z" fill="#495a79"/><path d="M502.059 459.4c-13.499 23.699-37.798 37.8-65.099 37.8H256V14.8c26.7 0 50.7 13.801 64.501 36.601L501.461 383.8c13.798 23.701 14.099 51.901.598 75.6z" fill="#42516d"/><path d="M475.661 399.1L294.699 66.699C286.601 52.9 271.901 44.8 256 44.8s-30.601 8.101-38.699 21.899L36.339 399.1c-8.399 14.101-8.399 31.199-.298 45.3 8.099 14.399 22.798 22.8 39 22.8h361.92c16.201 0 30.901-8.401 39-22.8 8.099-14.101 8.099-31.199-.3-45.3z" fill="#ffde33"/><path d="M475.96 444.4c-8.099 14.399-22.798 22.8-39 22.8H256V44.8c15.901 0 30.601 8.101 38.699 21.899L475.661 399.1c8.399 14.101 8.399 31.199.299 45.3z" fill="#ffbc33"/><g fill="#495a79"><path d="M256 437.2c-16.538 0-30-13.462-30-30s13.462-30 30-30 30 13.462 30 30-13.462 30-30 30zM286 317.2c0 16.538-13.462 30-30 30s-30-13.462-30-30v-150c0-16.538 13.462-30 30-30s30 13.462 30 30v150z"/></g><g fill="#42516d"><path d="M286 407.2c0-16.538-13.462-30-30-30v60c16.538 0 30-13.462 30-30zM286 317.2v-150c0-16.538-13.462-30-30-30v210c16.538 0 30-13.462 30-30z"/></g></svg>
                  <svg class="w-4 align-bottom" v-show="transformedFileSizeUnix > 104453" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M501.449 368.914L320.566 66.207C306.751 43.384 282.728 29.569 256 29.569s-50.752 13.815-64.567 36.638L10.55 368.914c-13.812 23.725-14.113 51.954-.599 75.678 13.513 23.723 37.836 37.838 65.165 37.838h361.766c27.329 0 51.653-14.115 65.165-37.838 13.516-23.724 13.215-51.953-.598-75.678z" fill="#e50027"/><path d="M502.049 444.592c-13.513 23.723-37.836 37.838-65.165 37.838H256V29.57c26.727 0 50.752 13.815 64.567 36.638L501.45 368.915c13.812 23.724 14.113 51.953.599 75.677z" fill="#c1001f"/><path d="M75.109 452.4c-16.628 0-30.851-8.27-39.063-22.669-8.211-14.414-8.065-31.087.469-45.72L217.23 81.549c8.27-13.666 22.816-21.951 38.769-21.951s30.5 8.284 38.887 22.157l180.745 302.49c8.388 14.4 8.534 31.072.322 45.485-8.211 14.4-22.435 22.669-39.063 22.669H75.109v.001z" fill="#fd003a"/><path d="M436.891 452.4c16.628 0 30.851-8.27 39.063-22.669 8.211-14.414 8.065-31.087-.322-45.485L294.886 81.754c-8.388-13.871-22.933-22.157-38.887-22.157V452.4h180.892z" fill="#e50027"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03s-30.031-13.514-30.031-30.03V152.095c0-16.517 13.514-30.031 30.031-30.031s30.03 13.514 30.03 30.031z" fill="#e1e4fb"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03V122.064c16.516 0 30.03 13.514 30.03 30.031z" fill="#c5c9f7"/><path d="M256 332.278c-24.926 0-45.046 20.119-45.046 45.046 0 24.924 20.119 45.046 45.046 45.046s45.046-20.121 45.046-45.046c0-24.926-20.121-45.046-45.046-45.046z" fill="#e1e4fb"/><path d="M301.046 377.323c0 24.924-20.119 45.046-45.046 45.046v-90.091c24.925 0 45.046 20.12 45.046 45.045z" fill="#c5c9f7"/></svg>
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div class="flex h-full w-full">
          <div id="editor" class="h-full bg-white shadow-2xl rounded-tl rounded-bl">
            <codemirror
              v-show="activeInputTab == 'html'"
              v-model="html.original"
              ref="codemirror"
              :options="codemirrorOptions"
              class="h-full"
            />
            <div class="h-full bg-white overflow-y-auto relative rounded-tl rounded-bl" v-show="activeInputTab == 'transformers'">
              <ul class="flex justify-between w-full border-b border-gray-300 bg-gray-100 text-gray-900 px-8 sticky top-0 z-50 relative">
                <li
                  v-for="(transformer, key, index) in transformers"
                  :key="index"
                  class="text-sm font-semibold py-4"
                  :class="[activeTransformerTab == key ? 'transformer--active' : 'cursor-pointer hover:opacity-75']"
                  @click="switchTransformerTab(key)"
                >
                  {{ transformer.name }}
                </li>
              </ul>

              <!-- CSS Inliner -->
              <div class="p-8" v-show="activeTransformerTab == 'inliner'">
                <ul>
                  <li class="mb-8 pb-8">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="inlinerToggle" name="inlinerToggle" v-model="transformers.inliner.enabled" class="switch" />
                        <label for="inlinerToggle" class="font-semibold">Inline CSS</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Uses the <a href="https://github.com/Automattic/juice" class="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener nofollow">Juice</a> library to inline your embedded CSS.
                      </p>
                    </div>
                    <div class="px-2 mt-6" v-show="transformers.inliner.enabled">
                      <h3 class="text-base text-black font-semibold mb-6">Options</h3>
                      <ul>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="applyAttributesTableElements" name="applyAttributesTableElements" v-model="transformers.inliner.options.applyAttributesTableElements" class="switch" />
                            <label for="applyAttributesTableElements">applyAttributesTableElements</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to create attributes for styles in <code class="inline-code">juice.styleToAttribute</code> on elements set in <code class="inline-code">juice.tableElements</code>.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="applyHeightAttributes" name="applyHeightAttributes" v-model="transformers.inliner.options.applyHeightAttributes" class="switch" />
                            <label for="applyHeightAttributes">applyHeightAttributes</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to use any CSS pixel heights to create height attributes on elements set in <code class="inline-code">juice.heightElements</code>.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="applyStyleTags" name="applyStyleTags" v-model="transformers.inliner.options.applyStyleTags" class="switch" />
                            <label for="applyStyleTags">applyStyleTags</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to inline styles in <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code>.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="applyWidthAttributes" name="applyWidthAttributes" v-model="transformers.inliner.options.applyWidthAttributes" class="switch" />
                            <label for="applyWidthAttributes">applyWidthAttributes</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to use any CSS pixel widths to create width attributes on elements set in <code class="inline-code">juice.widthElements</code>.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="inlinePseudoElements" name="inlinePseudoElements" v-model="transformers.inliner.options.inlinePseudoElements" class="switch" />
                            <label for="inlinePseudoElements">inlinePseudoElements</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to insert pseudo elements (<code class="inline-code">::before</code> and <code class="inline-code">::after</code>) as <code class="inline-code">&lt;span&gt;</code> into the DOM.
                            Note: Inserting pseudo elements will modify the DOM and may conflict with CSS selectors elsewhere on the page (e.g., <code class="inline-code">:last-child</code>).
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="preserveFontFaces" name="preserveFontFaces" v-model="transformers.inliner.options.preserveFontFaces" class="switch" />
                            <label for="preserveFontFaces">preserveFontFaces</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Preserves all <code class="inline-code">@font-face</code> within <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code> tags as a refinement when <code class="inline-code">removeStyleTags</code> is <code class="inline-code">true</code>. Other styles are removed.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="preserveImportant" name="preserveImportant" v-model="transformers.inliner.options.preserveImportant" class="switch" />
                            <label for="preserveImportant">preserveImportant</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Preserves <code class="inline-code">!important</code> in values.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="preserveMediaQueries" name="preserveMediaQueries" v-model="transformers.inliner.options.preserveMediaQueries" class="switch" />
                            <label for="preserveMediaQueries">preserveMediaQueries</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Preserves all media queries (and contained styles) within <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code> tags as a refinement when <code class="inline-code">removeStyleTags</code> is <code class="inline-code">true</code>. Other styles are removed.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="preserveKeyFrames" name="preserveKeyFrames" v-model="transformers.inliner.options.preserveKeyFrames" class="switch" />
                            <label for="preserveKeyFrames">preserveKeyFrames</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Preserves all key frames within <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code> tags as a refinement when <code class="inline-code">removeStyleTags</code> is <code class="inline-code">true</code>. Other styles are removed.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="preservePseudos" name="preservePseudos" v-model="transformers.inliner.options.preservePseudos" class="switch" />
                            <label for="preservePseudos">preservePseudos</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Preserves all rules containing pseudo selectors defined in <code class="inline-code">ignoredPseudos</code> within <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code> tags as a refinement when <code class="inline-code">removeStyleTags</code> is <code class="inline-code">true</code>. Other styles are removed.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="removeStyleTags" name="removeStyleTags" v-model="transformers.inliner.options.removeStyleTags" class="switch" />
                            <label for="removeStyleTags">removeStyleTags</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Whether to remove the original <code class="inline-code">&lt;style&gt;&lt;/style&gt;</code> tags after (possibly) inlining the css from them.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Code Cleanup -->
              <div class="p-8" v-show="activeTransformerTab == 'cleaner'">
                <ul>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="emailCombToggle" name="emailCombToggle" v-model="transformers.cleaner.tools.removeUnusedCSS.options.enabled" class="switch" />
                        <label for="emailCombToggle" class="font-semibold">Remove unused CSS</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Uses <a href="https://www.npmjs.com/package/email-comb" class="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">email-comb</a> to remove unused CSS.
                      </p>
                    </div>
                    <div class="px-2 mt-6" v-show="transformers.cleaner.tools.removeUnusedCSS.options.enabled">
                      <h3 class="text-base text-black font-semibold mb-6">Options</h3>
                      <ul class="px-2">
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="uglify" name="uglify" v-model="transformers.cleaner.tools.removeUnusedCSS.options.uglify" class="switch" />
                            <label for="uglify">uglify</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Will rename all <code class="inline-code">class</code> and <code class="inline-code">id</code> attributes to be as short as possible.
                          </p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="removeHTMLComments" name="removeHTMLComments" v-model="transformers.cleaner.tools.removeUnusedCSS.options.removeHTMLComments" class="switch" />
                            <label for="removeHTMLComments">removeHTMLComments</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            Will remove all HTML comments (<code class="inline-code">&lt;!--</code> to <code class="inline-code">--&gt;</code>)
                          </p>
                        </li>
                        <li class="mb-6">
                          <label for="removeUnusedCSS-whitelist" class="flex mb-2 cursor-pointer">whitelist</label>
                          <p class="text-gray-600 italic text-sm mb-4">
                            List all <code class="inline-code">class</code> or <code class="inline-code">id</code> values that you want <code class="inline-code">email-comb</code> to ignore. You can use all <a href="https://www.npmjs.com/package/matcher" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">matcher</a> patterns.
                          </p>
                          <div>
                            <tags-input class="form-input" v-model="transformers.cleaner.tools.removeUnusedCSS.options.whitelist">
                              <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                  <span>{{ tag }}</span>
                                  <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                    <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                  </button>
                                </span>
                                <input id="removeUnusedCSS-whitelist" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                              </div>
                            </tags-input>
                          </div>
                        </li>
                        <li class="mb-6">
                          <label class="flex mb-2">backend</label>
                          <p class="text-gray-600 italic text-sm mb-4">
                            If your HTML email has back-end code within class or id values,
                            i.e. <code v-pre class="inline-code">class="{{ computedClass }} main-box"</code>, you can prevent <code class="inline-code">{{</code>,
                            <code class="inline-code">computedClass</code> and <code class="inline-code">}}</code> to be treated as class names.
                            See the <a href="https://www.npmjs.com/package/email-comb#options---optsbackend" class="text-blue-500 hover:text-blue-700">docs</a>.
                          </p>
                          <div class="-mx-2">
                            <table class="mb-4 w-full">
                              <thead v-show="transformers.cleaner.tools.removeUnusedCSS.options.backend.length > 0">
                                <tr>
                                  <th class="font-normal text-gray-700 px-2 pb-2"><code class="inline-code">heads</code></th>
                                  <th class="font-normal text-gray-700 px-2 pb-2"><code class="inline-code">tails</code></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(pair, index) in transformers.cleaner.tools.removeUnusedCSS.options.backend"
                                  :key="`replaceStrings-${index}`"
                                >
                                  <td class="px-2 pb-4">
                                    <input type="text" class="form-input py-2 text-sm" v-model="pair.heads">
                                  </td>
                                  <td class="px-2 pb-4">
                                    <input type="text" class="form-input py-2 text-sm" v-model="pair.tails">
                                  </td>
                                  <td class="pb-4">
                                    <button
                                      @click="transformers.cleaner.tools.removeUnusedCSS.options.backend.splice(index, 1)"
                                      class="font-bold p-4 text-gray-600 hover:text-gray-700" title="Remove"
                                    >
                                      <svg class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th class="px-2">
                                    <button
                                      @click="transformers.cleaner.tools.removeUnusedCSS.options.backend.push({heads: '', tails: ''})"
                                      class="cursor-pointer text-sm font-semibold border px-4 py-1 rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                    >
                                      Add pair
                                    </button>
                                  </th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </li>
                        <li>
                          <label for="removeUnusedCSS-dnrwotc" class="flex mb-2 cursor-pointer">doNotRemoveHTMLCommentsWhoseOpeningTagContains</label>
                          <p class="text-gray-600 italic text-sm mb-4">
                            Email code often contains Outlook or IE conditional comments which you probably don't want to remove. Whatever strings you list here, if comment's opening tag will contain these, that tag will not be removed.
                          </p>
                          <div>
                            <tags-input class="form-input" v-model="transformers.cleaner.tools.removeUnusedCSS.options.doNotRemoveHTMLCommentsWhoseOpeningTagContains">
                              <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                  <span>{{ tag }}</span>
                                  <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                    <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                  </button>
                                </span>
                                <input id="removeUnusedCSS-dnrwotc" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                              </div>
                            </tags-input>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="replaceStrToggle" name="replaceStrToggle" v-model="transformers.cleaner.tools.replaceStrings.enabled" class="switch" />
                        <label for="replaceStrToggle" class="font-semibold">Replace strings</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Batch replace strings in your HTML email. Regex supported.
                      </p>
                    </div>
                    <div class="px-2 mt-6" v-show="transformers.cleaner.tools.replaceStrings.enabled">
                      <div class="-mx-2">
                        <table class="mb-4 w-full">
                          <thead v-show="transformers.cleaner.tools.replaceStrings.pairs.length > 0">
                            <tr>
                              <th class="font-normal text-gray-700 px-2 pb-2">Replace:</th>
                              <th class="font-normal text-gray-700 px-2 pb-2">With:</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(pair, index) in transformers.cleaner.tools.replaceStrings.pairs"
                              :key="`replaceStrings-${index}`"
                            >
                              <td class="px-2 pb-4">
                                <input type="text" class="form-input py-2 text-sm" v-model="pair.from">
                              </td>
                              <td class="px-2 pb-4">
                                <input type="text" class="form-input py-2 text-sm" v-model="pair.to">
                              </td>
                              <td class="pb-4">
                                <button
                                  @click="transformers.cleaner.tools.replaceStrings.pairs.splice(index, 1)"
                                  class="font-bold p-4 text-gray-600 hover:text-gray-700" title="Remove"
                                >
                                  <svg class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th class="px-2">
                                <button @click="transformers.cleaner.tools.replaceStrings.pairs.push({from: '', to: ''})" class="cursor-pointer text-sm font-semibold border px-4 py-1 rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                                  Add replacement
                                </button>
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </li>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="sixDigitHEXToggle" name="sixDigitHEXToggle" v-model="transformers.cleaner.tools.sixDigitHEX.enabled" class="switch" />
                        <label for="sixDigitHEXToggle" class="font-semibold">Six-digit HEX colors</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Ensures that all your HEX colors are defined with six digits.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Extra Attributes -->
              <div class="p-8" v-show="activeTransformerTab == 'extraAttributes'">
                <ul>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <p
                      class="italic text-gray-600"
                      :class="{'mb-8': transformers.extraAttributes.elements.length > 0}"
                    >
                      Add any number of attributes to any elements in your HTML.
                      Tag names can also be <a href="https://cheerio.js.org/" target="_blank" rel="nofollow noopener noreferrer" class="text-blue-500 hover:text-blue-700">cheerio</a> selectors.
                    </p>
                    <div class="-mx-2">
                      <table class="mb-4 w-full">
                        <thead v-show="transformers.extraAttributes.elements.length > 0">
                          <tr>
                            <th class="font-normal text-gray-700 px-2 pb-4">Tag name</th>
                            <th class="font-normal text-gray-700 px-4 pb-4">
                              <table class="w-full -mx-2">
                                <tr>
                                  <td class="w-1/2 px-2">Attribute name</td>
                                  <td class="w-1/2 px-2">Attribute value</td>
                                  <td class="px-2 w-10 flex"></td>
                                </tr>
                              </table>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(el, index) in transformers.extraAttributes.elements" :key="`extraAttributes-${index}`">
                            <td class="w-1/3 px-2 align-top">
                              <input type="text" class="form-input py-2 text-sm" v-model="el.name">
                            </td>
                            <td class="w-2/3 px-4 pb-8">
                              <table class="w-full -mx-2">
                                <tr v-for="(attribute, i) in el.attributes" :key="`${el.name}-attribute-${i}`">
                                  <td class="px-2 pb-4">
                                    <input type="text" class="form-input py-2 text-sm" v-model="attribute.name">
                                  </td>
                                  <td class="px-2 pb-4">
                                    <input type="text" class="form-input py-2 text-sm" v-model="attribute.value">
                                  </td>
                                  <td class="px-2 pb-4 w-10">
                                    <button
                                      @click="el.attributes.length > 1 ? el.attributes.splice(i, 1) : transformers.extraAttributes.elements.splice(index, 1)">
                                      <svg class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                    </button>
                                  </td>
                                </tr>
                              </table>
                              <button @click="el.attributes.push({name: '', value: ''})" class="flex items-center cursor-pointer text-sm font-semibold text-blue-500 focus:outline-none">
                                <span class="text-lg font-bold -mt-px mr-1">+</span>
                                Add attribute
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th class="px-2 pt-8">
                              <button @click="transformers.extraAttributes.elements.push({name: '', attributes: [{name: '', value: ''}]})" class="cursor-pointer text-sm font-semibold border px-4 py-1 rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                                Add element
                              </button>
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </li>
                </ul>
              </div>

               <!-- URLs -->
              <div class="p-8" v-show="activeTransformerTab == 'urls'">
                <ul>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <label for="baseImageURL" class="flex mb-2 cursor-pointer">Base Image URL</label>
                      <p class="text-gray-600 italic text-sm mb-4">
                        Define a base URL that will be prepended to all image sources in your email. Applies to both inline and background images.
                      </p>
                      <input id="baseImageURL" type="text" class="form-input py-2 text-sm" v-model="transformers.urls.items.baseImageURL.url">
                    </div>
                  </li>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <label for="removeUnusedCSS-whitelist" class="flex mb-2 cursor-pointer">URL Parameters</label>
                      <p class="text-gray-600 italic text-sm mb-4">
                        Add any number of query string parameters to your anchor URLs.
                      </p>
                    </div>
                    <div class="px-2 mt-6">
                      <div class="-mx-2">
                        <table class="mb-4 w-full">
                          <thead v-show="transformers.urls.items.urlParameters.pairs.length > 0">
                            <tr>
                              <th class="font-normal text-gray-700 px-2 pb-2">Key:</th>
                              <th class="font-normal text-gray-700 px-2 pb-2">Value:</th>
                              <th class="font-normal text-gray-700 px-2 pb-2">Encode?</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(pair, index) in transformers.urls.items.urlParameters.pairs"
                              :key="`replaceStrings-${index}`"
                            >
                              <td class="px-2 pb-4">
                                <input type="text" class="form-input py-2 text-sm" v-model="pair.key">
                              </td>
                              <td class="px-2 pb-4">
                                <input type="text" class="form-input py-2 text-sm" v-model="pair.value">
                              </td>
                              <td class="px-2 pb-4 w-10 text-center">
                                <input type="checkbox" class="form-checkbox cursor-pointer" v-model="pair.encode">
                              </td>
                              <td class="pb-4 text-right">
                                <button
                                  @click="transformers.urls.items.urlParameters.pairs.splice(index, 1)"
                                  class="font-bold p-4 text-gray-600 hover:text-gray-700" title="Remove"
                                >
                                  <svg class="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <th class="px-2">
                                <button @click="transformers.urls.items.urlParameters.pairs.push({key: '', value: '', encode: false})" class="cursor-pointer text-sm font-semibold border px-4 py-1 rounded text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                                  Add pair
                                </button>
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Prettify -->
              <div class="p-8" v-show="activeTransformerTab == 'prettify'">
                <ul>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="prettifyToggle" name="prettifyToggle" v-model="transformers.prettify.enabled" class="switch" />
                        <label for="prettifyToggle" class="font-semibold">Prettify Code</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Uses <a href="https://www.npmjs.com/package/pretty" class="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener nofollow noreferrer">pretty</a> to pretty-print your HTML code.
                      </p>
                    </div>
                    <div class="px-2 mt-6" v-show="transformers.prettify.enabled">
                      <h3 class="text-base text-black font-semibold mb-6">Options</h3>
                      <ul>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="prettyOCD" name="prettyOCD" v-model="transformers.prettify.options.ocd" class="switch" />
                            <label for="prettyOCD">OCD</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">
                            <ul class="list-disc pl-6">
                              <li>condenses multiple newlines to a single newline</li>
                              <li>trims leading and trailing whitespace</li>
                              <li>ensures that a trailing newline is inserted</li>
                              <li>normalizes whitespace before code comments</li>
                            </ul>
                          </p>
                        </li>
                        <li class="mb-8 pb-8 border-b border-gray-200">
                          <div class="px-2">
                            <h3 class="text-base text-black font-semibold mb-2">js-beautify</h3>
                            <p class="text-gray-600 italic text-sm mb-6">
                              Configure <a href="https://www.npmjs.com/package/js-beautify" target="_blank" rel="nofollow noreferrer noopener" class="text-blue-500 hover:text-blue-700">js-beautify</a> options.
                            </p>
                            <ul>
                              <li class="mb-6" :class="{['opacity-50 pointer-events-none select-none']: transformers.prettify.options.indent_with_tabs}">
                                <label for="prettyIndentSize" class="flex mb-2 cursor-pointer">indent_size</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  How many characters should be used for indentation size.
                                </p>
                                <input
                                  id="prettyIndentSize"
                                  type="number"
                                  min="0"
                                  class="form-input py-2 text-sm w-auto"
                                  v-model="transformers.prettify.options.indent_size"
                                  :disabled="transformers.prettify.options.indent_with_tabs"
                                >
                              </li>
                              <li class="mb-6" :class="{['opacity-50 pointer-events-none select-none']: transformers.prettify.options.indent_with_tabs}">
                                <label for="prettyIndentChar" class="flex mb-2 cursor-pointer">indent_char</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  What character should be used for indentation. Default is one space character.
                                </p>
                                <input
                                  id="prettyIndentChar"
                                  type="text"
                                  class="form-input py-2 text-sm w-auto"
                                  v-model="transformers.prettify.options.indent_char"
                                  :disabled="transformers.prettify.options.indent_with_tabs"
                                >
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyIndentWithTabs" name="prettyIndentWithTabs" v-model="transformers.prettify.options.indent_with_tabs" class="switch" />
                                  <label for="prettyIndentWithTabs">indent_with_tabs</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  Indent with tabs, overrides previous two options.
                                </p>
                              </li>
                              <li class="mb-6">
                                <label for="prettyEOL" class="flex mb-2 cursor-pointer">eol</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Character(s) to use as line terminators. (default: <code class="inline-code">\\n</code>)
                                </p>
                                <input id="prettyEOL" type="text" class="form-input py-2 text-sm w-auto" v-model="transformers.prettify.options.eol">
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyEndWithNewline" name="prettyEndWithNewline" v-model="transformers.prettify.options.end_with_newline" class="switch" />
                                  <label for="prettyEndWithNewline">end_with_newline</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  End output with newline.
                                </p>
                              </li>
                              <li class="mb-6">
                                <label for="prettifyInline" class="flex mb-2 cursor-pointer">inline</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  List of tags to be considered inline tags.
                                </p>
                                <div>
                                  <tags-input class="form-input" v-model="transformers.prettify.options.inline">
                                    <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                      <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                        <span>{{ tag }}</span>
                                        <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                          <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                        </button>
                                      </span>
                                      <input id="prettifyInline" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                                    </div>
                                  </tags-input>
                                </div>
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyIndentInnerHTML" name="prettyIndentInnerHTML" v-model="transformers.prettify.options.indent_inner_html" class="switch" />
                                  <label for="prettyIndentInnerHTML">indent_inner_html</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  Indent <code class="inline-code">&lt;head&gt;</code> and <code class="inline-code">&lt;body&gt;</code> sections.
                                </p>
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyIndentEmptyLines" name="prettyIndentEmptyLines" v-model="transformers.prettify.options.indent_empty_lines" class="switch" />
                                  <label for="prettyIndentEmptyLines">indent_empty_lines</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  Keep indentation on empty lines.
                                </p>
                              </li>
                              <li class="mb-6">
                                <label for="prettifyExtraLiners" class="flex mb-2 cursor-pointer">extra_liners</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  List of tags that should have an extra newline before them.
                                </p>
                                <div>
                                  <tags-input class="form-input" v-model="transformers.prettify.options.extra_liners">
                                    <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                      <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                        <span>{{ tag }}</span>
                                        <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                          <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                        </button>
                                      </span>
                                      <input id="prettifyExtraLiners" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                                    </div>
                                  </tags-input>
                                </div>
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyPreserveNewlines" name="prettyPreserveNewlines" v-model="transformers.prettify.options.preserve_newlines" class="switch" />
                                  <label for="prettyPreserveNewlines">preserve_newlines</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  Preserve existing line-breaks.
                                </p>
                              </li>
                              <li class="mb-6">
                                <label for="prettifyContentUnformatted" class="flex mb-2 cursor-pointer">content_unformatted</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  List of tags whose content should not be reformatted,
                                </p>
                                <div>
                                  <tags-input class="form-input" v-model="transformers.prettify.options.content_unformatted">
                                    <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                      <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                        <span>{{ tag }}</span>
                                        <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                          <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                        </button>
                                      </span>
                                      <input id="prettifyContentUnformatted" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                                    </div>
                                  </tags-input>
                                </div>
                              </li>
                              <li class="mb-6">
                                <label for="prettyMaxPreserveLines" class="flex mb-2 cursor-pointer">max_preserve_newlines</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Maximum number of line-breaks to be preserved in one chunk.
                                </p>
                                <input id="prettyMaxPreserveLines" type="number" min="0" class="form-input py-2 text-sm w-auto" v-model="transformers.prettify.options.max_preserve_newlines">
                              </li>
                              <li class="mb-6">
                                <label for="prettyMaxPreserveLines" class="flex mb-2 cursor-pointer">wrap_line_length</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Maximum characters per line (0 disables)
                                </p>
                                <input id="prettyMaxPreserveLines" type="number" min="0" class="form-input py-2 text-sm w-auto" v-model="transformers.prettify.options.wrap_line_length">
                              </li>
                              <li class="mb-6">
                                <label for="prettyWrapAttributes" class="flex mb-2 cursor-pointer">wrap_attributes</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Wrap attributes to new lines (auto|force|force-aligned|force-expand-multiline|aligned-multiple|preserve|preserve-aligned)
                                </p>
                                <input id="prettyWrapAttributes" type="text" class="form-input py-2 text-sm w-auto" v-model="transformers.prettify.options.wrap_attributes">
                              </li>
                              <li class="mb-6">
                                <label for="prettyWrapAttributesIndentSize" class="flex mb-2 cursor-pointer">wrap_attributes_indent_size</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Indent wrapped attributes to after N characters (ignored if <code class="inline-code">wrap-attributes</code> is <code class="inline-code">aligned</code>)
                                </p>
                                <input id="prettyWrapAttributesIndentSize" type="number" min="0" class="form-input py-2 text-sm w-auto" v-model="transformers.prettify.options.wrap_attributes_indent_size">
                              </li>
                              <li class="mb-6">
                                <div class="checkbox-toggle mb-4">
                                  <input type="checkbox" id="prettyUnescapeStrings" name="prettyUnescapeStrings" v-model="transformers.prettify.options.unescape_strings" class="switch" />
                                  <label for="prettyUnescapeStrings">unescape_strings</label>
                                </div>
                                <p class="text-gray-600 italic text-sm pl-12">
                                  Decode printable characters encoded in xNN notation.
                                </p>
                              </li>
                              <li class="mb-6">
                                <label for="prettifyUnformatted" class="flex mb-2 cursor-pointer">unformatted</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  List of tags (defaults to inline tags) that should not be reformatted
                                </p>
                                <div>
                                  <tags-input class="form-input" v-model="transformers.prettify.options.unformatted">
                                    <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                      <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                        <span>{{ tag }}</span>
                                        <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                          <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                        </button>
                                      </span>
                                      <input id="prettifyUnformatted" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                                    </div>
                                  </tags-input>
                                </div>
                              </li>
                              <li class="mb-6">
                                <label for="prettyUnformattedContentDelimiter" class="flex mb-2 cursor-pointer">unformatted_content_delimiter</label>
                                <p class="text-gray-600 italic text-sm mb-4">
                                  Keep text content together between this string.
                                </p>
                                <input
                                  type="text"
                                  id="prettyUnformattedContentDelimiter"
                                  class="form-input py-2 text-sm w-auto"
                                  v-model="transformers.prettify.options.unformatted_content_delimiter"
                                >
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Minify -->
              <div class="p-8" v-show="activeTransformerTab == 'minify'">
                <ul>
                  <li class="mb-8 pb-8 border-b border-gray-200">
                    <div class="px-2">
                      <div class="checkbox-toggle mb-4">
                        <input type="checkbox" id="minifyToggle" name="minifyToggle" v-model="transformers.minify.enabled" class="switch" />
                        <label for="minifyToggle" class="font-semibold">Minify Code</label>
                      </div>
                      <p class="text-gray-600 italic text-sm pl-12">
                        Uses <a href="https://www.npmjs.com/package/html-crush" class="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener nofollow noreferrer">html-crush</a> to minify your HTML code.
                      </p>
                    </div>
                    <div class="px-2 mt-6" v-show="transformers.minify.enabled">
                      <h3 class="text-base text-black font-semibold mb-6">Options</h3>
                      <ul>
                        <li class="mb-6">
                          <label for="minifyLineLengthLimit" class="flex mb-2 cursor-pointer">lineLengthLimit</label>
                          <p class="text-gray-600 italic text-sm mb-4">
                            When removing line breaks, what is the maximum line length to keep?
                          </p>
                          <input id="minifyLineLengthLimit" type="number" min="1" class="form-input py-2 text-sm w-auto" v-model="transformers.minify.options.lineLengthLimit">
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="minifyremoveIndentations" name="minifyremoveIndentations" v-model="transformers.minify.options.removeIndentations" class="switch" />
                            <label for="minifyremoveIndentations">removeIndentations</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">Should indentations be removed?</p>
                        </li>
                        <li class="mb-6">
                          <div class="checkbox-toggle mb-4">
                            <input type="checkbox" id="minifyRemoveLineBreaks" name="minifyRemoveLineBreaks" v-model="transformers.minify.options.removeLineBreaks" class="switch" />
                            <label for="minifyRemoveLineBreaks">removeLineBreaks</label>
                          </div>
                          <p class="text-gray-600 italic text-sm pl-12">Should line breaks be removed?</p>
                        </li>
                        <li class="mb-6">
                          <label for="minifyBreakToTheLeftOf" class="flex mb-2 cursor-pointer">breakToTheLeftOf</label>
                          <p class="text-gray-600 italic text-sm mb-4">
                            When any of given strings are encountered AND <code class="inline-code">removeLineBreaks</code> option is on, current line will be terminated.
                          </p>
                          <div>
                            <tags-input class="form-input" v-model="transformers.minify.options.breakToTheLeftOf">
                              <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                                <span class="tags-input-tag" v-for="(tag, index) in tags" :key="index">
                                  <span>{{ tag }}</span>
                                  <button type="button" class="tags-input-remove" @click="removeTag(tag)">
                                    <svg class="w-2 h-2 fill-current mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                  </button>
                                </span>
                                <input id="minifyBreakToTheLeftOf" class="tags-input-text" placeholder="Type and hit Enter..." v-on="inputEvents" v-bind="inputAttrs">
                              </div>
                            </tags-input>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div id="preview" class="h-full bg-white shadow-2xl rounded-tr rounded-br">
            <span class="iframe-width-helper" :class="{'hidden': iframeWidth < 1}">{{ iframeWidth + 'px' }}</span>
            <codemirror
              v-show="activeOutputTab == 'html'"
              v-model="html.transformed"
              ref="codemirror"
              :options="{...codemirrorOptions, autofocus: false}"
              class="h-full"
            />
            <iframe
              v-show="activeOutputTab == 'preview'"
              ref="preview"
              title="preview"
              class="w-full h-full rounded-tr rounded-br"
              sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
              allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor"
              allowtransparency="true"
              allowpaymentrequest="true"
              :srcdoc="html.transformed || html.original"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagsInput from './components/TagsInput'

import Split from 'split.js'
import Swal from 'sweetalert2'
import ByteSize from './helpers/bytesize'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/addon/selection/mark-selection')
require('codemirror/mode/htmlmixed/htmlmixed')

let splitPanes = null

export default {
  name: 'app',
  components: {
    codemirror,
    TagsInput,
  },
  data: () => {
    return {
      altering: false,
      html: {
        original: '',
        transformed: '',
      },
      activeInputTab: 'html',
      activeOutputTab: 'html',
      activetab: 'html',
      activeTransformerTab: 'inliner',
      iframeWidth: 0,
      panelWidths: {
        input: 0,
        output: 0,
      },
      codemirrorOptions: {
        mode: 'htmlmixed',
        tabSize: 2,
        autofocus: true,
        lineNumbers: true,
        theme: 'github',
        styleSelectedText: true,
      },
      transformers: {
        inliner: {
          name: 'CSS Inliner',
          enabled: false,
          options: {
            applyAttributesTableElements: true,
            applyHeightAttributes: true,
            applyStyleTags: true,
            applyWidthAttributes: true,
            inlinePseudoElements: false,
            preserveFontFaces: true,
            preserveImportant: false,
            preserveMediaQueries: true,
            preserveKeyFrames: true,
            preservePseudos: true,
            removeStyleTags: true,
          },
        },
        cleaner: {
          name: 'Code Cleanup',
          enabled: false,
          tools: {
            removeUnusedCSS: {
              name: 'Remove unused CSS',
              enabled: false,
              options: {
                uglify: false,
                removeHTMLComments: true,
                whitelist: [],
                backend: [],
                doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif'],
              },
            },
            replaceStrings: {
              name: 'Replace strings',
              enabled: false,
              pairs: [],
            },
            sixDigitHEX: {
              name: 'Six-digit HEX colors',
              enabled: false,
            },
          },
        },
        extraAttributes: {
          name: 'Extra Attributes',
          elements: [],
        },
        urls: {
          name: 'URLs',
          items: {
            baseImageURL: {
              name: 'Base Image URL',
              url: '',
            },
            urlParameters: {
              name: 'URL Parameters',
              pairs: [],
            },
          },
        },
        prettify: {
          name: 'Prettify',
          enabled: false,
          options: {
            ocd: true,
            indent_size: 2,
            indent_char: ' ',
            indent_with_tabs: false,
            eol: '\\n',
            end_with_newline: false,
            inline: [],
            indent_inner_html: false,
            indent_empty_lines: false,
            extra_liners: [],
            preserve_newlines: true,
            content_unformatted: ['pre'],
            max_preserve_newlines: 10,
            wrap_line_length: 0,
            wrap_attributes: 'auto',
            wrap_attributes_indent_size: 2,
            unescape_strings: false,
            unformatted: [],
            unformatted_content_delimiter: '',
          },
        },
        minify: {
          name: 'Minify',
          enabled: false,
          options: {
            lineLengthLimit: 500,
            removeIndentations: true,
            removeLineBreaks: true,
            breakToTheLeftOf: [
              '</td',
              '<html',
              '<head',
              '<meta',
              '<table',
              '<!DOCTYPE',
              '<style',
              '</style',
              '<title',
              '<body',
              '@media',
              '</html',
              '</body',
              '<!--[if',
              '<!--<![endif'
            ],
          },
        },
      },
    }
  },
  mounted () {
    const $vm = this
    const inputArea = document.getElementById('editor')
    const outputArea = document.getElementById('preview')

    splitPanes = Split([inputArea, outputArea], {
      minSize: [600, 300],
      gutterSize: 4,
      snapOffset: 0,
      onDrag () {
        $vm.iframeWidth = $vm.getIframeWidth()
        $vm.panelWidths.input = $vm.getElementWidth(inputArea)
        $vm.panelWidths.output = $vm.getElementWidth(outputArea)
      },
      onDragEnd () {
        $vm.iframeWidth = 0
      }
    })

    $vm.resetGutterPosition()

    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        $vm.showAbout = false
      }
    })
  },
  methods: {
    openAbout () {
      Swal.fire({
        title: `<span class="flex flex-col-reverse items-center">alter.email<svg class="fill-current w-10 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="M17 0c-3.8984 0-7.3008 2.5-8.5 6H9c.6016 0 1.0938.0938 1.5938.0938C11.6952 3.6953 14.1991 2 17 2c3.8984 0 7 3.1016 7 7 0 2.8008-1.6953 5.3047-4.0938 6.4063C20.0079 15.9063 20 16.5 20 17v.5c3.5-1.1992 6-4.6016 6-8.5 0-5-4-9-9-9zm3.5 5.5l-5.4063.8125 1.5938 1.5625-7.3125 7.3125-1.5625-1.5938-.7188 5.3125 5.3125-.7187-1.5937-1.5625 7.3125-7.3125 1.5625 1.5938zM9 8c-5 0-9 4-9 9s4 9 9 9 9-4 9-9c0-1.6016-.3945-3.0117-1.0938-4.3125l-1.5 1.5C15.8048 14.9883 16 16 16 17c0 3.8984-3.1016 7-7 7s-7-3.1016-7-7 3.1016-7 7-7c1 0 2.0117.1953 2.8125.5938l1.5-1.5C12.0117 8.3944 10.6015 8 9 8z"/></svg></span>`,
        html: `Transform your HTML emails`,
        footer: `
            <p>
              A project by <a href="https://twitter.com/cossssmin" rel="noopener noreferrer" target="_blank">@cossssmin</a>.
              Source code on <a href="https://github.com/cossssmin/alter.email" rel="noopener noreferrer" target="_blank">GitHub</a>.
            </p>
            <p>Powered by <a href="https://maizzle.com" rel="noopener noreferrer" target="_blank">Maizzle</a>, hosted with <a href="https://www.netlify.com/" rel="noopener noreferrer" target="_blank">Netlify</a>.</p>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        onOpen: () => {
          Swal.getFocusableElements()[0].blur()
        }
      })
    },
    switchTab (name) {
      this.activetab = name
      this.$refs.codemirror.editor.focus()
    },
    switchTransformerTab (name) {
      this.activeTransformerTab = name
    },
    getElementWidth (el) {
      return el.clientWidth
    },
    getIframeWidth () {
      return this.$refs.preview.clientWidth
    },
    splitReset () {
      splitPanes.setSizes([50, 50])
      this.panelWidths.input = 0
      this.panelWidths.output = 0
    },
    resetGutterPosition () {
      let gutter = document.getElementsByClassName('gutter')
      gutter[0].addEventListener('dblclick', this.splitReset)
    },
    submitToServer () {
      const $vm = this

      return new Promise((resolve, reject) => {
        fetch(`/.netlify/functions/transform`, {
          method: "POST",
          body: JSON.stringify({
            html: $vm.html.original,
            config: $vm.transformers,
          })
        })
        .then(response => response.json())
        .then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        });
      })
    },
    handleSubmit () {
      const $vm = this

      if ($vm.html.original.length < 1) {
        Swal.fire({
          title: 'Missing content',
          text: 'Please add at least an HTML version.',
          type: 'error',
          confirmButtonText: 'Dismiss'
        })

        return
      }

      $vm.altering = true

      $vm.submitToServer().then(response => {
        if (response.error) {
          Swal.fire({
            title: 'Well, 💩.',
            html: `<em>${JSON.stringify(response.error) || 'Something went wrong, the HTML was not processed.'}</em>`,
            footer: `
              <span class="text-sm text-gray-600">
                The email was not processed.
                If this looks like a bug, please <a href="https://github.com/cossssmin/alter.email/issues" target="_blank" class="text-blue-500 hover:underline">open an issue</a>.
              </span>
            `,
            type: 'error',
            confirmButtonText: 'Close',
            onOpen: () => {
              $vm.altering = false
            },
          })
        } else {
          if (response.html) {
            $vm.html.transformed = response.html

            if (process.env.NODE_ENV !== 'development' && window.ga) {
              window.ga('send', 'event', 'Transformation', 'transform', 'Transformations', response.transforms)
            }
          }
          $vm.altering = false
        }
      })
    },
  },
  computed: {
    originalFileSizeUnix () {
      return ByteSize.count(this.html.original)
    },
    originalFormattedFileSizeUnix () {
      return this.html.original.length > 0 ? '~ ' + ByteSize.format(this.originalFileSizeUnix) : '0 KB'
    },
    transformedFileSizeUnix () {
      return ByteSize.count(this.html.transformed)
    },
    transformedFormattedFileSizeUnix () {
      return this.html.transformed.length > 0 ? '~ ' + ByteSize.format(this.transformedFileSizeUnix) : '0 KB'
    },
  }
}
</script>

<style>
/*! purgecss start ignore */
@import "tailwindcss/base";
/*! purgecss end ignore */

@import "tailwindcss/components";

@import "codemirror/lib/codemirror";
@import "sweetalert2/dist/sweetalert2";
@import "codemirror-theme-github/theme/github";

@import "/assets/css/app";
@import "/assets/css/tags";

@import "tailwindcss/utilities";
</style>
