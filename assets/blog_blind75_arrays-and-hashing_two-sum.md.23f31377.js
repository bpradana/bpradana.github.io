import{_ as s,c as n,o as a,a as l}from"./app.94d45614.js";const i=JSON.parse('{"title":"Blind 75","description":"","frontmatter":{"layout":"doc","title":"Blind 75","lang":"en-US"},"headers":[{"level":2,"title":"Description","slug":"description"},{"level":2,"title":"Solution","slug":"solution"}],"relativePath":"blog/blind75/arrays-and-hashing/two-sum.md"}'),p={name:"blog/blind75/arrays-and-hashing/two-sum.md"},o=l(`<h1 id="two-sum" tabindex="-1">Two Sum <a class="header-anchor" href="#two-sum" aria-hidden="true">#</a></h1><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-hidden="true">#</a></h2><p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.</p><p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p><p>You can return the answer in any order.</p><p><strong>Example 1:</strong></p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Input: nums = [2,7,11,15], target = 9</span></span>
<span class="line"><span style="color:#A6ACCD;">Output: [0,1]</span></span>
<span class="line"><span style="color:#A6ACCD;">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Example 2:</strong></p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Input: nums = [3,2,4], target = 6</span></span>
<span class="line"><span style="color:#A6ACCD;">Output: [1,2]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Example 3:</strong></p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Input: nums = [3,3], target = 6</span></span>
<span class="line"><span style="color:#A6ACCD;">Output: [0,1]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= nums.length &lt;= 10^4</code></li><li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li><li><code>-10^9 &lt;= target &lt;= 10^9</code></li><li><strong>Only one valid answer exists.</strong></li></ul><h2 id="solution" tabindex="-1">Solution <a class="header-anchor" href="#solution" aria-hidden="true">#</a></h2><p><strong>Solution 1:</strong></p><div class="language-python"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">twoSum</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    length </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> length</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> j </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> length</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> j</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><p><strong>Solution 2:</strong></p><div class="language-python"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">twoSum</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    dict_nums </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">    set_nums </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">set</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> set_nums</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        dict_nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">num</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">count</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">num</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> value </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> dict_nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">items</span><span style="color:#89DDFF;">():</span></span>
<span class="line"><span style="color:#A6ACCD;">        dict_nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">        n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> target </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> key</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> set_nums</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">continue</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> key</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">index</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">n</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">index</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">key</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">index</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">n</span><span style="color:#89DDFF;">)+</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">index</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">n</span><span style="color:#89DDFF;">),</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">index</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">key</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"></span></code></pre></div><p><strong>Solution 3:</strong></p><div class="language-python"><span class="copy"></span><pre><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">twoSum</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    dict_nums </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> num </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">enumerate</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        n </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">num</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> n </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> dict_nums</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">dict_nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">],</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">        dict_nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">num</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> i</span></span>
<span class="line"></span></code></pre></div>`,20),e=[o];function t(c,r,D,y,F,A){return a(),n("div",null,e)}var u=s(p,[["render",t]]);export{i as __pageData,u as default};