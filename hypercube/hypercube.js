function calc_cube() {

    // build volume
    var build_x, build_y, build_z;

    // extrusion lengths
    var ext_x, ext_y, ext_z, ext_bed_x, ext_bed_y;

    // rod lengths
    var rod_x, rod_y, rod_z;

    // extra bits
    var leadscrew; // length of lead screw used with motor coupler
    var extra_z;   // space under the printer for storing power supply, boards, etc
    var belt_length; // length of a single belt which can be cut into two

    // used to read/write to/from the page
    var input_x, input_y, input_z, output1_x, output1_y, output1_z, output2_x, output2_y, output2_z;

    // processing for optional parts
    var part_x, part_y, part_z, part_name_x, part_name_y, part_name_z;

    // let's get to work!
    var choice = document.getElementById("calc_sel").options[calc_sel.selectedIndex].value;

    // get number input
    input_x = parseInt(document.getElementById('input_value_x').value);
    input_y = parseInt(document.getElementById('input_value_y').value);
    input_z = parseInt(document.getElementById('input_value_z').value);
    extra_z = parseInt(document.getElementById('extra_area_z').value);

    // part processing

    // constructor for part object
    // x/y/z values define how much a remix part requires smaller (negative) or larger (positive) axes than tech2c's parts
    // bed_x/y values are compared to the relevant build area axis
    var Part = function(){};
    Part.prototype = { ext_x: 0, ext_y: 0, ext_z: 0, rod_x: 0, rod_y: 0, rod_z: 0, bed_x: -65, bed_y: 85 };

    // properties of parts
    var part_x_tech2c = new Part();
    var part_y_tech2c = new Part();
    var part_z_tech2c = new Part();

    var part_z_henryarnold = new Part();
    part_z_henryarnold.ext_z = 20;
    part_z_henryarnold.rod_z = 20;

    var part_z_adrianm = new Part();
    part_z_adrianm.rod_z = -100;
    part_z_adrianm.bed_x = 110;
    part_z_adrianm.bed_y = -65;

    // get part input
    part_name_x = document.getElementById("part_sel_x").options[part_sel_x.selectedIndex].value;
    part_name_y = document.getElementById("part_sel_y").options[part_sel_y.selectedIndex].value;
    part_name_z = document.getElementById("part_sel_z").options[part_sel_z.selectedIndex].value;

    switch (part_name_x) {
        default:
            part_x = part_x_tech2c;
            break;
    }

    switch (part_name_y) {
        default:
            part_y = part_y_tech2c;
            break;
    }

    switch (part_name_z) {
        case "z_sel_henryarnold":
            part_z = part_z_henryarnold;
            break;
        case "z_sel_adrianm":
            part_z = part_z_adrianm;
            break;
        default:
            part_z = part_z_tech2c;
            break;
    }

    switch (choice) {
        case "build_area":
            build_x = input_x;
            build_y = input_y;
            build_z = input_z;

            ext_x = build_x + 140 + part_x.ext_x;
            ext_y = build_y + 103 + part_y.ext_y;
            ext_z = build_z + 195 + part_z.ext_z + extra_z;

            rod_x = build_x + 160 + part_x.rod_x;
            rod_y = build_y + 100 + part_y.rod_y;
            rod_z = build_z + 195 + part_z.rod_z;

            // output1 = extrusions
            output1_x = ext_x;
            output1_y = ext_y;
            output1_z = ext_z;
            // output2 = rods
            output2_x = rod_x;
            output2_y = rod_y;
            output2_z = rod_z;

            break;

        case "extrusions":
            ext_x = input_x;
            ext_y = input_y;
            ext_z = input_z;

            build_x = ext_x - 140 - part_x.ext_x;
            build_y = ext_y - 103 - part_y.ext_y;
            build_z = ext_z - 195 - part_z.ext_z - extra_z;

            rod_x = build_x + 160 + part_x.rod_x;
            rod_y = build_y + 100 + part_y.rod_y;
            rod_z = build_z + 195 + part_z.rod_z;

            // output1 = build area
            output1_x = build_x;
            output1_y = build_y;
            output1_z = build_z;
            // output2 = rods
            output2_x = rod_x;
            output2_y = rod_y;
            output2_z = rod_z;

            break;

        case "rods":
            rod_x = input_x;
            rod_y = input_y;
            rod_z = input_z;

            build_x = rod_x - 160 - part_x.rod_x;
            build_y = rod_y - 100 - part_y.rod_y;
            build_z = rod_z - 195 - part_z.rod_z - extra_z;

            ext_x = build_x + 140 + part_x.ext_x;
            ext_y = build_y + 103 + part_y.ext_y;
            ext_z = build_z + 195 + part_z.ext_z + extra_z;

            // output1 = extrusions
            output1_x = ext_x;
            output1_y = ext_y;
            output1_z = ext_z;
            // output2 = build area
            output2_x = build_x;
            output2_y = build_y;
            output2_z = build_z;

            break;
    }

    ext_bed_x = build_x + part_z.bed_x;
    ext_bed_y = build_y + part_z.bed_y;
    leadscrew = build_z + 145;
    belt_length = 250 + ((rod_x*2)+(rod_y*2))*2;

    // output processing
    document.getElementById("output1_value_x").innerHTML = output1_x;
    document.getElementById("output1_value_y").innerHTML = output1_y;
    document.getElementById("output1_value_z").innerHTML = output1_z;

    document.getElementById("output2_value_x").innerHTML = output2_x;
    document.getElementById("output2_value_y").innerHTML = output2_y;
    document.getElementById("output2_value_z").innerHTML = output2_z;

    document.getElementById("output0_ext_bed_x").innerHTML = ext_bed_x;
    document.getElementById("output0_ext_bed_y").innerHTML = ext_bed_y;
    document.getElementById("output0_leadscrew").innerHTML = leadscrew;
    document.getElementById("output0_belt").innerHTML = belt_length;
}

function draw_labels() {
    var choice = document.getElementById("calc_sel").options[calc_sel.selectedIndex].value;

    // labels applied to XYZ of each input/output box
    var label_area = "Build Area";
    var label_exts = "Extrusions (4x)";
    var label_rods = "Rods (2x)";

    // labels for headers above each input/output box
    var header_exts = "Frame Extrusion";
    var header_area = label_area;
    var header_rods = "Rods";

    // fill this depending on which way we're calculating
    var label = {input: "", output_header: "", output1: "", output2: ""};

    // put labels in here. i can't help but feel there's a better way to do this
    var input_label_array, output1_label_array, output2_label_array;

    // loop variable
    var i;

    switch (choice) {
        case "build_area":
            label.input = label_area;
            label.output_header = header_exts + " and " + header_rods;
            label.output1 = label_exts;
            label.output2 = label_rods;
            break;
        case "extrusions":
            label.input = label_exts;
            label.output_header = header_area + " and " + header_rods;
            label.output1 = label_area;
            label.output2 = label_rods;
            break;
        case "rods":
            label.input = label_rods;
            label.output_header = header_exts + " and " + header_area;
            label.output1 = label_exts;
            label.output2 = label_area;
            break;
    }

    input_label_array = ["input_label_x", "input_label_y", "input_label_z"];

    for (i = 0; i < input_label_array.length; i++) {
        document.getElementById(input_label_array[i]).innerHTML = label.input;
    }

    document.getElementById("output_header").innerHTML = label.output_header;

    output1_label_array = ["output1_label_x", "output1_label_y", "output1_label_z"];

    for (i = 0; i < output1_label_array.length; i++) {
        document.getElementById(output1_label_array[i]).innerHTML = label.output1;
    }

    output2_label_array = ["output2_label_x", "output2_label_y", "output2_label_z"];

    for (i = 0; i < output2_label_array.length; i++) {
        document.getElementById(output2_label_array[i]).innerHTML = label.output2;
    }

}

function engage() {
    // here's to the finest crew in starfleet - https://www.youtube.com/watch?v=X6oUz1v17Uo
    draw_labels();
    calc_cube();
}

