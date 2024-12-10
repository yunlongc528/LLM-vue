<template>
    <div id="myDiagramDiv" style="width:100%; height:500px; background-color: white;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DatePicker from '@/components/DatePicker/index.vue'
const selectedDate = ref(['', ''])
onMounted(() => {
    const $ = go.GraphObject.make;

    const myDiagram = new go.Diagram("myDiagramDiv", {
        "undoManager.isEnabled": true,
        layout: $(go.TreeLayout, {
            angle: 0,
            nodeSpacing: 50,
            layerSpacing: 100
        })
    });

    // 定义根节点模板
    const rootNodeTemplate =
        $(go.Node, "Horizontal",
            {
                background: "white",
                shadowOffset: new go.Point(0, 3),
                shadowBlur: 5,
                shadowColor: "rgba(0, 0, 0, 0.3)",
                movable: false,
                width: "250px",  // 设置子节点宽度
                height: "250px"    // 添加这一行
            },
            $(go.Picture,
                { margin: 10, width: 400, height: 40, background: "white" },
                new go.Binding("source")
            ),
            $(go.Panel, "Vertical",
                { alignment: go.Spot.Left },
                $(go.TextBlock,
                    { margin: new go.Margin(5, 5, 0, 5), font: "bold 14px Arial", stroke: "black" },
                    new go.Binding("text", "name")
                ),
                $(go.TextBlock,
                    { margin: new go.Margin(0, 5, 5, 5), font: "12px Arial", stroke: "#555" },
                    new go.Binding("text", "id")
                )
            )
        );

    // 定义子节点模板
    const childNodeTemplate =
        $(go.Node, "Horizontal",
            {
                background: "white",
                shadowOffset: new go.Point(0, 3),
                shadowBlur: 5,
                shadowColor: "rgba(0, 0, 0, 0.3)",
                movable: false,
                width: 100,  // 设置按钮宽度
                height: 40   // 添加这一行
            },
            $(go.Picture,
                { margin: 10, width: 40, height: 40 },
                new go.Binding("source")
            ),
            $(go.Panel, "Vertical",
                { alignment: go.Spot.Left },
                $(go.TextBlock,
                    { margin: new go.Margin(5, 5, 0, 5), font: "bold 14px Arial", stroke: "black" },
                    new go.Binding("text", "name")
                ),
                $(go.TextBlock,
                    { margin: new go.Margin(0, 5, 5, 5), font: "12px Arial", stroke: "#555" },
                    new go.Binding("text", "id")
                )
            )
        );

    // 使用条件模板
    myDiagram.nodeTemplateMap.add("root", rootNodeTemplate);
    myDiagram.nodeTemplateMap.add("child", childNodeTemplate);

    // 定义实线连接
    myDiagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 1.5, stroke: "#555" })
        );

    // 创建模型数据
    const nodeDataArray = [
        { key: "1", name: "罗少龙评审表", id: "A330282050000204095", source: "/src/assets/icons/b.svg", category: "root" },
        { key: "2", parent: "1", name: "罗少龙", id: "330282198909294038", source: "/src/assets/icons/user.svg", category: "child" },
        { key: "3", parent: "1", name: "微信帮号", id: "chicharito1414", source: "/src/assets/icons/earth.svg", category: "child" }
    ];

    myDiagram.model = new go.TreeModel(nodeDataArray);

    // 添加"快速建议"按钮和虚线连接
    myDiagram.addDiagramListener("InitialLayoutCompleted", e => {
        const diagram = e.diagram;
        diagram.nodes.each(node => {
            if (node.category === "child") {
                const button = $(go.Node, "Auto",
                    {
                        movable: false,
                        width: 100,  // 设置按钮宽度
                        height: 40
                    },
                    $(go.Shape, "RoundedRectangle", { fill: "#3498db", stroke: null, with: "80px", height: "30px" }),
                    $(go.TextBlock, "快速建议", { margin: 5, stroke: "white", font: "12px Arial" })
                );

                button.location = new go.Point(node.location.x + 200, node.location.y);
                diagram.add(button);

                const dottedLink = $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape, { strokeWidth: 1.5, stroke: "#555", strokeDashArray: [3, 3] })
                );
                dottedLink.fromNode = node;
                dottedLink.toNode = button;
                diagram.add(dottedLink);
            }
        });
    });
})

</script>