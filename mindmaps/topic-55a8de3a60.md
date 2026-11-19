---
generated_by: note-mindmaps
title: "知识与检索"
slug: topic-55a8de3a60
---

# 知识与检索

- [Embedding：用向量表示语义与比较相似性](/notes/embeddings-and-similarity/)
  - [表示学习把文本映射为向量](/notes/embeddings-and-similarity/#%E5%90%91%E9%87%8F%E8%A1%A8%E7%A4%BA%E6%80%8E%E6%A0%B7%E5%B8%AE%E5%8A%A9%E6%AF%94%E8%BE%83)
  - [余弦比较方向](/notes/embeddings-and-similarity/#%E7%94%A8%E4%B8%80%E4%B8%AA%E4%BA%8C%E7%BB%B4%E4%BE%8B%E5%AD%90%E7%90%86%E8%A7%A3%E4%BD%99%E5%BC%A6)
  - [相似不等于事实一致](/notes/embeddings-and-similarity/#%E6%A3%80%E7%B4%A2%E5%88%86%E6%95%B0%E7%9A%84%E8%BE%B9%E7%95%8C)
- [检索与重排序：先找候选，再细看相关性](/notes/retrieval-and-reranking/)
  - [关键词与语义提供不同匹配线索](/notes/retrieval-and-reranking/#%E4%B8%A4%E7%A7%8D%E5%8C%B9%E9%85%8D%E7%BA%BF%E7%B4%A2)
  - [检索与重排序分两步](/notes/retrieval-and-reranking/#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%85%88%E5%8F%AC%E5%9B%9E%E5%86%8D%E9%87%8D%E6%8E%92)
  - [候选规模不等于召回率](/notes/retrieval-and-reranking/#%E5%8F%AC%E5%9B%9E%E9%98%B6%E6%AE%B5%E4%B8%8E%E5%8F%AC%E5%9B%9E%E7%8E%87%E4%B8%8D%E6%98%AF%E4%B8%80%E5%9B%9E%E4%BA%8B)
- [RAG：让回答建立在可追溯的资料上](/notes/rag/)
  - [先检索再结合资料生成](/notes/rag/#rag-%E8%BF%9E%E6%8E%A5%E6%A3%80%E7%B4%A2%E4%B8%8E%E7%94%9F%E6%88%90)
  - [保留片段与原文的对应](/notes/rag/#%E6%96%87%E6%A1%A3%E6%80%8E%E6%A0%B7%E5%8F%98%E6%88%90%E5%8F%AF%E7%94%A8%E8%AF%81%E6%8D%AE)
  - [有引用仍要核对支持关系](/notes/rag/#%E7%94%A8%E7%AC%94%E8%AE%B0%E9%97%AE%E7%AD%94%E8%B5%B0%E4%B8%80%E9%81%8D)
  - [RAG 不要求使用 Agent](/notes/rag/#%E4%B8%8E%E5%BE%AE%E8%B0%83%E5%92%8C-agent-%E7%9A%84%E5%85%B3%E7%B3%BB)
- [文档解析与切分：把文件变成可检索片段](/notes/document-parsing-chunking/)
  - [解析质量决定后面所有环节](/notes/document-parsing-chunking/#%E8%A7%A3%E6%9E%90%E6%98%AF%E7%AC%AC%E4%B8%80%E6%AD%A5)
  - [切分粒度影响召回与上下文](/notes/document-parsing-chunking/#%E5%88%87%E5%88%86%E7%B2%92%E5%BA%A6%E5%BD%B1%E5%93%8D%E5%8F%AC%E5%9B%9E%E4%B8%8E%E4%B8%8A%E4%B8%8B%E6%96%87)
  - [给每块补上下文能提升召回](/notes/document-parsing-chunking/#%E7%BB%99%E6%AF%8F%E5%9D%97%E8%A1%A5%E4%B8%8A%E4%B8%8B%E6%96%87)
  - [小知识库可以不切分](/notes/document-parsing-chunking/#%E5%B0%8F%E7%9F%A5%E8%AF%86%E5%BA%93%E5%8F%AF%E4%BB%A5%E4%B8%8D%E5%88%87%E5%88%86)
- [混合检索与查询改写：让召回不只靠向量](/notes/hybrid-retrieval/)
  - [BM25 补上精确词面匹配](/notes/hybrid-retrieval/#bm25-%E8%A1%A5%E4%B8%8A%E8%AF%8D%E9%9D%A2%E5%8C%B9%E9%85%8D)
  - [RRF 按排名合并多路结果](/notes/hybrid-retrieval/#%E7%94%A8-rrf-%E5%90%88%E5%B9%B6%E5%A4%9A%E8%B7%AF%E7%BB%93%E6%9E%9C)
  - [查询改写要防止改变原意](/notes/hybrid-retrieval/#%E6%9F%A5%E8%AF%A2%E6%94%B9%E5%86%99)
  - [重排要看精度与预算](/notes/hybrid-retrieval/#%E9%87%8D%E6%8E%92%E7%9A%84%E9%A2%84%E7%AE%97)
- [检索的权限与更新：过滤、增量与失效](/notes/retrieval-permissions-updates/)
  - [权限过滤要在进入上下文之前](/notes/retrieval-permissions-updates/#%E6%9D%83%E9%99%90%E8%BF%87%E6%BB%A4%E8%A6%81%E5%9C%A8%E6%A3%80%E7%B4%A2%E5%89%8D)
  - [索引更新不是实时的](/notes/retrieval-permissions-updates/#%E7%B4%A2%E5%BC%95%E6%9B%B4%E6%96%B0%E6%9C%89%E5%BB%B6%E8%BF%9F)
  - [删除与失效要和写入一起设计](/notes/retrieval-permissions-updates/#%E5%88%A0%E9%99%A4%E4%B8%8E%E5%A4%B1%E6%95%88%E8%A6%81%E4%B8%80%E8%B5%B7%E8%AE%BE%E8%AE%A1)
  - [权限变化要触发重新索引](/notes/retrieval-permissions-updates/#%E6%9D%83%E9%99%90%E5%8F%98%E5%8C%96%E8%A6%81%E8%83%BD%E9%87%8D%E6%96%B0%E7%B4%A2%E5%BC%95)
