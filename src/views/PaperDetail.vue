<template>
  <v-container class="paper-detail-page">
    <v-row>
      <v-col cols="3" class="toc">
        <p class="text-center text-h5 font-weight-bold toc-title">文章目录</p>
        <pre class="toc-content">
            {{ toc_content }}
        </pre>
      </v-col>
      <v-col cols="9">
        <p class="text-left font-weight-bold paper-title">{{ paper_title }}</p>
        <p class="text-left paper-data">{{ paper_data }}</p>
        <v-container class="paper-info">
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">作者：</v-col>
            <v-col cols="10" class="paper-info-content" style="color: #185ABD">{{ author }}</v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">摘要：</v-col>
            <v-col cols="10" class="paper-info-content">{{ abstract }}</v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">关键词：</v-col>
            <v-col cols="10" class="paper-info-content" style="color: #185ABD">{{ keywords }}</v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">年份：</v-col>
            <v-col cols="10" class="paper-info-content">{{ year }}</v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">DOI：</v-col>
            <v-col cols="10" class="paper-info-content">{{ doi }}</v-col>
          </v-row>
        </v-container>
        <v-row class="paper-button-row">
          <v-col cols="2">
            <div class="paper-button">收藏</div>
          </v-col>
          <v-col cols="2">
            <div class="paper-button">引用</div>
          </v-col>
          <v-col cols="2">
            <div class="paper-button">报错</div>
          </v-col>
          <v-col cols="2">
            <div class="paper-button">分享</div>
          </v-col>
        </v-row>
        <div class="download-area">
          <div class="download-buttons">
            <span class="download-button" style="background-color: #FF9C59">HTML阅读</span>
            <span class="download-button" style="background-color: #3A85C6">CAJ下载</span>
            <span class="download-button" style="background-color: #28B611">PDF下载</span>
          </div>
        </div>
        <v-row class="divide-bar">
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="2">相关推荐</v-col>
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <div class="recommendations">
          <v-tabs v-model="tab" fixed-tabs background-color="rgb(240,240,240)">
            <v-tab>相似文献</v-tab>
            <v-tab>参考文献</v-tab>
            <v-tab>引证文献</v-tab>
            <v-tab>相关学术成果</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div class="recommendation-tab">
                <div class="recommendation-tab-item" v-for="paper in similar_papers" :key="paper.id">
                  <p class="similar-paper-title">{{ paper.title }}</p>
                  <p class="similar-paper-abstract">{{ paper.abstract }}</p>
                  <p class="similar-paper-author-and-source">{{ paper.author + ' - ' + paper.source }}</p>
                  <p class="similar-paper-citations-and-year">
                    {{ '被引量：' + paper.citations + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '发表：' + paper.year }}</p>
                  <v-divider class="recommendation-tab-item-divider"></v-divider>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="recommendation-tab">
                <div class="recommendation-tab-item" v-for="paper in similar_papers" :key="paper.id">
                  <p class="similar-paper-title">{{ paper.title }}</p>
                  <p class="similar-paper-abstract">{{ paper.abstract }}</p>
                  <p class="similar-paper-author-and-source">{{ paper.author + ' - ' + paper.source }}</p>
                  <p class="similar-paper-citations-and-year">
                    {{ '被引量：' + paper.citations + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '发表：' + paper.year }}</p>
                  <v-divider class="recommendation-tab-item-divider"></v-divider>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="recommendation-tab">
                <div class="recommendation-tab-item" v-for="paper in similar_papers" :key="paper.id">
                  <p class="similar-paper-title">{{ paper.title }}</p>
                  <p class="similar-paper-abstract">{{ paper.abstract }}</p>
                  <p class="similar-paper-author-and-source">{{ paper.author + ' - ' + paper.source }}</p>
                  <p class="similar-paper-citations-and-year">
                    {{ '被引量：' + paper.citations + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '发表：' + paper.year }}</p>
                  <v-divider class="recommendation-tab-item-divider"></v-divider>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="recommendation-tab">
                <div class="recommendation-tab-item" v-for="paper in similar_papers" :key="paper.id">
                  <p class="similar-paper-title">{{ paper.title }}</p>
                  <p class="similar-paper-abstract">{{ paper.abstract }}</p>
                  <p class="similar-paper-author-and-source">{{ paper.author + ' - ' + paper.source }}</p>
                  <p class="similar-paper-citations-and-year">
                    {{ '被引量：' + paper.citations + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '发表：' + paper.year }}</p>
                  <v-divider class="recommendation-tab-item-divider"></v-divider>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>456</v-tab-item>
            <v-tab-item>789</v-tab-item>
            <v-tab-item>101112</v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PaperDetail',
  data() {
    return {
      toc_content: `
0 引言
1 士豆、玉米的品种选择
2 把士豆切成块状，并进行催芽
3 适期播种，合理密植与套种
  3.1 春士豆的种植
  3.2 夏士豆的种植
4 科学管理
5 关键技术
  5.1 种植地块的选择
  5.2 种植士豆时要覆盖地膜
  5.3 士豆打塘播种
  5.4 玉米双行单株定向种植
6 玉米套士豆种植时的注意事项
7 结语
`,
      paper_title: '优势的重塑与跨越──乌盟"土豆立盟"战略实施纪实',
      paper_data: '来自 维普期刊专业版  |  下载量：20  | 引用量：66',
      author: '张三',
      abstract: '1955年,针对乌盟地区"十年九旱,年年春旱,无霜期短"的自然条件,乌盟盟委,行署积极调整优化产业结构,提出了"土豆立盟"的发展思路.经过几年的实践.乌盟的土豆产业化迈出了较大的步伐,目前,全盟土豆种植面积达到500万亩,占全国土豆总播面积的1/10.土豆总产达到80亿斤,占全国土豆总产量的8.7%.可出售的商品薯达到60亿斤以上,商品率达到70%.农民从直接出售及加工土豆中,人均增收623元,占全部收入的40%,土豆,这一自然界带给人类的可食性植物,在乌盟对稳粮增收,加快脱贫致富步伐,起到了积极的支柱作用.(一)当我们回眸马铃薯产业化发展给乌盟人带来的实惠时,人们不会丢弃乌盟的过去.仿佛就在',
      keywords: '战略实施 土豆 乌盟 产业化 种植土 发展思路 种植面积 脱毒种薯 脱贫致富 红格尔图',
      year: '2022',
      doi: '10.3969/j.issn.1000-1239.2022.01.001',
      tab: null,
      similar_papers: [
        {
          id: 1,
          title: '跨越发展奔小康-—达茂联合旗实施"三集中"战略纪实',
          abstract: '＜正＞落后旗县如何使经济发展驶入快车道,农牧民收入大提高?达茂旗的实践证明,有了超常规发展的思路,才会有跨越式发展的出路。2002年,达茂旗全社会固定资产投资…',
          author: '张滨艳',
          source: '《实践(思想理论版)》',
          citations: 0,
          year: 2003
        },
        {
          id: 2,
          title: '积极实施"六化"战略全力推进跨越发展——府谷县经济社会发展纪实',
          abstract: '近年来,府谷县紧紧国绕打造国内一流的煤电化载能工业基地的目标,立足资源优势,坚持科学发展,大力实施新型工业化,农业产业化城乡一体化,民企集团化;环境大优化,民生优…',
          author: '刘玲',
          source: '《新西部(新闻版)》',
          citations: 0,
          year: 2010
        },
        {
          id: 3,
          title: '跨越 突破 搏击 -- 农二师实施大调整大转变战略纪实',
          abstract: '新年伊始,记者来到农二师采访,深深地感受到这里在经济结构战略性大调整、发展方式战略性大转变过程中所展现出的勃勃生机,新的希望正在这里冉冉升腾。“要立足农业内涵…',
          author: '高利，栗卫亚',
          source: '《当代兵团》',
          citations: 0,
          year: 2010
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.paper-detail-page {
  background-color: white;
  width: vw(1920);
  margin: 0;
}

.toc {
  background-color: #fafafa;
}

.toc-title {
  margin-top: vw(40);
}

.toc-content {
  margin-left: vw(40);
  margin-right: vw(40);
  line-height: vh(40);
  font-size: small;
}

.paper-title {
  margin-top: vh(90);
  padding-left: vw(180);
  font-family: "宋体 Bold", "宋体 常规", "宋体", sans-serif;
  font-weight: 700;
  font-size: 28px;
  font-style: normal;
}

.paper-data {
  margin-top: vh(45);
  padding-left: vw(180);
  font-family: "黑体", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #7f7f7f;
  margin-bottom: 0;
}

.paper-info {
  padding-left: vw(180);
}

.paper-info-title {
  font-family: "黑体 Bold", "黑体", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #000000;
  padding: vw(5) 0;
}

.paper-info-content {
  font-size: 14px;
  color: #7F7F7F;
  line-height: 26px;
  padding: vw(5) 0;
}

.paper-info-row {
  margin: 0;
  padding: 0;
}

.paper-button-row {
  padding-left: vw(180);
  height: vh(40);
}

.paper-button {
  height: 100%;
  width: 80%;
  background-color: #EFF8FC;
  border-radius: 20px;
  font-size: 14px;
  text-align: center;
  line-height: vh(40);
  font-weight: 700;
  color: #506E96;
}

.download-area {
  margin-top: vh(60);
  padding-top: vh(20);
  padding-bottom: vh(20);
  height: vh(75);
  background-color: rgba(241, 246, 249, 1);
}

.download-buttons {
  margin-left: vw(180);
}

.download-button {
  color: white;
  height: 100%;
  width: vw(100);
  margin: vh(5);
  padding: vh(12) vh(30);
  font-size: 14px;
  border-radius: 5px;
}

.divide-bar {
  width: 100%;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  font-family: "宋体", sans-serif;
  text-align: center;
}

.divide {
  padding-top: vh(40);
}

.recommendations {
  margin-left: vw(100);
  margin-right: vw(100);
}

.similar-paper-title {
  font-size: 18px;
  margin-top: vh(15);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366CC;
}

.similar-paper-abstract {
  font-size: 12px;
  margin-top: vh(5);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #7F7F7F;
  line-height: vh(35);
}

.similar-paper-author-and-source {
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366CC;
}

.similar-paper-citations-and-year{
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: vh(20);
  color: #7F7F7F;
}
</style>