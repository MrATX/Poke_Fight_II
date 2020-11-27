weight_classes_dict = {
    "light":[0,300],
    "middle":[300,400],
    "cruiser":[400,500],
    "heavy":[500,1000],
    "legendary":[0,1000],
    "all":[0,1000]
}
weight_class_keys = ["light","middle","cruiser","heavy"]

for k in weight_class_keys:
    print(weight_classes_dict[k][0])