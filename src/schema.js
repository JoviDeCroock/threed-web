export default JSON.parse("{\"__schema\":{\"queryType\":{\"name\":\"Query\"},\"mutationType\":{\"name\":\"Mutation\"},\"subscriptionType\":{\"name\":\"Subscription\"},\"types\":[{\"kind\":\"OBJECT\",\"name\":\"Query\",\"fields\":[{\"name\":\"threads\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"}}}},\"args\":[{\"name\":\"sortBy\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}},{\"name\":\"skip\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},{\"name\":\"limit\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"thread\",\"type\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"},\"args\":[{\"name\":\"id\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"me\",\"type\":{\"kind\":\"OBJECT\",\"name\":\"User\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"Thread\",\"fields\":[{\"name\":\"id\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"title\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"text\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"createdBy\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"User\"}},\"args\":[]},{\"name\":\"createdAt\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"repliesNumber\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"replies\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Reply\"}}},\"args\":[{\"name\":\"skip\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},{\"name\":\"limit\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"likesNumber\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"likes\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Like\"}}},\"args\":[{\"name\":\"skip\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},{\"name\":\"limit\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"hasUserLiked\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"User\",\"fields\":[{\"name\":\"id\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"username\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"avatar\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"createdAt\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"Reply\",\"fields\":[{\"name\":\"id\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"text\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"thread\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"}},\"args\":[]},{\"name\":\"createdBy\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"User\"}},\"args\":[]},{\"name\":\"createdAt\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"likesNumber\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"likes\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Like\"}}}},\"args\":[{\"name\":\"skip\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},{\"name\":\"limit\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"hasUserLiked\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"Like\",\"fields\":[{\"name\":\"id\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"createdBy\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"User\"}},\"args\":[]},{\"name\":\"createdAt\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"Mutation\",\"fields\":[{\"name\":\"createThread\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"}},\"args\":[{\"name\":\"input\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"reply\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Reply\"}},\"args\":[{\"name\":\"input\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"likeThread\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"}},\"args\":[{\"name\":\"threadId\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"likeReply\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Reply\"}},\"args\":[{\"name\":\"replyId\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"signup\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"SigninResult\"}},\"args\":[{\"name\":\"username\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}},{\"name\":\"password\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"signin\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"SigninResult\"}},\"args\":[{\"name\":\"username\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}},{\"name\":\"password\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"SigninResult\",\"fields\":[{\"name\":\"user\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"User\"}},\"args\":[]},{\"name\":\"token\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"Subscription\",\"fields\":[{\"name\":\"newThread\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Thread\"}},\"args\":[]},{\"name\":\"newReply\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Reply\"}},\"args\":[{\"name\":\"threadId\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"newThreadLike\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Like\"}},\"args\":[{\"name\":\"threadId\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]},{\"name\":\"newReplyLike\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"Like\"}},\"args\":[{\"name\":\"replyId\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__Schema\",\"fields\":[{\"name\":\"types\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}}}},\"args\":[]},{\"name\":\"queryType\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}},\"args\":[]},{\"name\":\"mutationType\",\"type\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"},\"args\":[]},{\"name\":\"subscriptionType\",\"type\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"},\"args\":[]},{\"name\":\"directives\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Directive\"}}}},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__Type\",\"fields\":[{\"name\":\"kind\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"name\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"description\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"fields\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Field\"}}},\"args\":[{\"name\":\"includeDeprecated\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"interfaces\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}}},\"args\":[]},{\"name\":\"possibleTypes\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}}},\"args\":[]},{\"name\":\"enumValues\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__EnumValue\"}}},\"args\":[{\"name\":\"includeDeprecated\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}]},{\"name\":\"inputFields\",\"type\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__InputValue\"}}},\"args\":[]},{\"name\":\"ofType\",\"type\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__Field\",\"fields\":[{\"name\":\"name\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"description\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"args\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__InputValue\"}}}},\"args\":[]},{\"name\":\"type\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}},\"args\":[]},{\"name\":\"isDeprecated\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"deprecationReason\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__InputValue\",\"fields\":[{\"name\":\"name\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"description\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"type\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__Type\"}},\"args\":[]},{\"name\":\"defaultValue\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__EnumValue\",\"fields\":[{\"name\":\"name\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"description\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"isDeprecated\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"deprecationReason\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"OBJECT\",\"name\":\"__Directive\",\"fields\":[{\"name\":\"name\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}},\"args\":[]},{\"name\":\"description\",\"type\":{\"kind\":\"SCALAR\",\"name\":\"Any\"},\"args\":[]},{\"name\":\"locations\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"SCALAR\",\"name\":\"Any\"}}}},\"args\":[]},{\"name\":\"args\",\"type\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"LIST\",\"ofType\":{\"kind\":\"NON_NULL\",\"ofType\":{\"kind\":\"OBJECT\",\"name\":\"__InputValue\"}}}},\"args\":[]}],\"interfaces\":[]},{\"kind\":\"SCALAR\",\"name\":\"Any\"}],\"directives\":[]}}");