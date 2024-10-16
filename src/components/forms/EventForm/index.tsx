import React, { useState, useEffect } from "react";
import { Text, StyleSheet, GestureResponderEvent, ScrollView, View } from "react-native";
import { Switch } from "react-native-switch";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconMarkEvent from "../../svgs/IconMarkEvent";
import { Row, DefaultTextInput, SectionTitle, TextError } from "@/src/styles-global";
import { colors } from "@/src/assets/colors";
import { Chip } from "react-native-material-chips";
import DefaultButton from "../../buttons/DefaultButton";
import { ModalTitle } from "./styles";
import InputIcon from "../../inputs/InputIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { addEvent, updateEvent } from "@/src/realmDB/services/EventService";
import { Category, Event } from "@/src/utils/types";
import { convertToDateTime } from "@/src/utils";

//= ==============================================================================================
interface EventFormProps {
    onFinish?: (event: GestureResponderEvent) => void;
    selectedEvent?: Event;
    daySelected?: string | null;
}

//= ==============================================================================================
const EventSchema = Yup.object().shape({
    id: Yup.string().notRequired().nullable(),
    eventName: Yup.string().required("Event Name is required"),
    description: Yup.string(),
    date: Yup.string().required("Date is required"),
    startTime: Yup.string()
        .required("Start time is required")
        .matches(/^\d{2}:\d{2}$/, "Time must be in 00:00 format"),
    endTime: Yup.string().when("startTime", (startTime, schema) => {
        return startTime
            ? schema.test(
                  "is-greater",
                  "End time must be later than start time",
                  function (endTime) {
                      if (startTime && endTime) {
                          return endTime > startTime;
                      }
                      return true;
                  },
              )
            : schema.notRequired();
    }),
    remindsMe: Yup.boolean(),
    category: Yup.object()
        .shape({
            label: Yup.string().required("Label is required"),
            value: Yup.string().required("Value is required"),
            color: Yup.string().required("Color is required"),
        })
        .notRequired(),
});

//= ==========================================================================================
const EventForm: React.FC<EventFormProps> = ({ onFinish, selectedEvent, daySelected }) => {
    const categoryDefault = { label: "Default", value: "0", color: colors.secondaryDark };
    const categories = [
        { label: "Brainstorm", value: "1", color: colors.purple },
        { label: "Design", value: "2", color: colors.green },
        { label: "Workout", value: "3", color: colors.blue },
    ];
    const [endTimeEnabled, setEndTimeEnabled] = useState(false);
    const [categorySelected, setCategorySelected] = useState({} as Category);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showPickerDate, setShowPickerDate] = useState(false);
    const [showPickerStartTime, setShowPickerStartTime] = useState(false);
    const [showPickerEndTime, setShowPickerEndTime] = useState(false);

    //= ==============================================================================================
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    id: selectedEvent?.id || "",
                    eventName: selectedEvent?.eventName || "",
                    description: selectedEvent?.description || "",
                    date: selectedEvent?.date || daySelected || "",
                    startTime: selectedEvent?.startTime || "",
                    endTime: selectedEvent?.endTime || "",
                    remindsMe: selectedEvent?.remindsMe || false,
                    category: {
                        label: "",
                        value: "",
                        color: "",
                    },
                }}
                validationSchema={EventSchema}
                onSubmit={async event => {
                    try {
                        await EventSchema.validate(event);
                        console.log("Form submitted successfully with values: ", event);

                        if (event.id) {
                            updateEvent(event.id, event);
                        } else {
                            addEvent(event);
                        }

                        onFinish(event.date);
                    } catch (error) {
                        console.error("Validation error: ", error);
                    }
                }}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => {
                    useEffect(() => {
                        if (selectedEvent?.id) {
                            setDate(convertToDateTime(selectedEvent.date, selectedEvent.startTime));
                            setStartTime(
                                convertToDateTime(selectedEvent.date, selectedEvent.startTime),
                            );
                            if (selectedEvent?.endTime)
                                setEndTime(
                                    convertToDateTime(selectedEvent.date, selectedEvent.endTime),
                                );
                            if (selectedEvent?.category)
                                onHandleChipSelected(selectedEvent?.category);

                            setEndTimeEnabled(true);
                        } else {
                            onHandleChipSelected(categoryDefault);
                            setFieldValue("startTime", "");
                        }

                        if (daySelected) setDate(convertToDateTime(daySelected, "00:00"));
                    }, [selectedEvent]);

                    const onChangeDate = (event: any, selectedDate?: Date | undefined) => {
                        const currentDate = selectedDate || date;
                        setShowPickerDate(false);
                        setDate(currentDate);
                        const formattedDate = currentDate.toISOString().split("T")[0];
                        setFieldValue("date", formattedDate);
                    };

                    const onChangeStartTime = (event: any, selectedTime?: Date | undefined) => {
                        setShowPickerStartTime(false);
                        const currentTime = selectedTime || date;
                        const formattedTime = moment(currentTime.toISOString()).format("HH:mm");

                        setStartTime(currentTime);
                        setFieldValue("startTime", formattedTime);
                        setEndTimeEnabled(true);
                    };

                    const onChangeEndTime = (event: any, selectedTime?: Date | undefined) => {
                        setShowPickerEndTime(false);
                        const currentTime = selectedTime || date;
                        const formattedTime = moment(currentTime.toISOString()).format("HH:mm");

                        setEndTime(currentTime);
                        setFieldValue("endTime", formattedTime);
                    };

                    const onHandleChipSelected = selected => {
                        setCategorySelected(selected);
                        setFieldValue("category", selected);
                    };

                    return (
                        <ScrollView style={styles.formContainer}>
                            <ModalTitle>
                                {selectedEvent?.id ? "Edit Event" : "Add New Event"}
                            </ModalTitle>
                            <DefaultTextInput
                                placeholder="Event Name*"
                                placeholderTextColor={colors.blueGray}
                                onChangeText={handleChange("eventName")}
                                onBlur={handleBlur("eventName")}
                                value={values.eventName}
                            />
                            {touched.eventName && errors.eventName && (
                                <TextError>{errors.eventName}</TextError>
                            )}

                            <DefaultTextInput
                                style={{ height: 90 }}
                                placeholder="Type the note here..."
                                placeholderTextColor={colors.blueGray}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                value={values.description}
                                multiline={true}
                                numberOfLines={5}
                            />

                            <TouchableOpacity
                                onPress={() => setShowPickerDate(true)}
                                activeOpacity={0.7}>
                                <View pointerEvents="none">
                                    <InputIcon
                                        iconName="calendar"
                                        placeholder="Date"
                                        placeholderTextColor={colors.blueGray}
                                        onChangeText={() => handleChange("date")}
                                        onBlur={() => handleBlur("date")}
                                        value={values.date}
                                    />
                                </View>
                            </TouchableOpacity>

                            {touched.date && errors.date && <TextError>{errors.date}</TextError>}

                            {showPickerDate && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                />
                            )}

                            <Row gap="10px" style={{ justifyContent: "space-between", flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        onPress={() => setShowPickerStartTime(true)}
                                        activeOpacity={0.7}
                                        style={{ flex: 1 }}>
                                        <View pointerEvents="none">
                                            <InputIcon
                                                iconName="clock"
                                                placeholder="Start time"
                                                placeholderTextColor={colors.blueGray}
                                                onChangeText={text => {
                                                    handleChange("startTime")(text);
                                                    setEndTimeEnabled(!!text);
                                                }}
                                                onBlur={() => handleBlur("startTime")}
                                                value={values.startTime}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {showPickerStartTime && (
                                    <DateTimePicker
                                        value={startTime}
                                        mode="time"
                                        display="default"
                                        onChange={onChangeStartTime}
                                    />
                                )}

                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                        disabled={!endTimeEnabled}
                                        onPress={() => setShowPickerEndTime(true)}
                                        activeOpacity={0.7}
                                        style={{ flex: 1 }}>
                                        <View pointerEvents="none">
                                            <InputIcon
                                                iconName="clock"
                                                style={{ opacity: endTimeEnabled ? 1 : 0.5 }}
                                                placeholder="End time"
                                                placeholderTextColor={colors.blueGray}
                                                editable={endTimeEnabled}
                                                onChangeText={text => handleChange("endTime")(text)}
                                                onBlur={() => handleBlur("endTime")}
                                                value={values.endTime}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {showPickerEndTime && (
                                    <DateTimePicker
                                        value={endTime}
                                        mode="time"
                                        display="default"
                                        onChange={onChangeEndTime}
                                    />
                                )}
                            </Row>

                            {touched.startTime && errors.startTime && (
                                <TextError>{errors.startTime}</TextError>
                            )}
                            {touched.endTime && errors.endTime && (
                                <TextError>{errors.endTime}</TextError>
                            )}

                            <Row
                                marginTop="10px"
                                marginBottom="20px"
                                style={{ justifyContent: "space-between" }}>
                                <Text>Reminds Me</Text>
                                <Switch
                                    onValueChange={value => setFieldValue("remindsMe", value)}
                                    value={values.remindsMe}
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    circleSize={20}
                                    barHeight={22}
                                    circleBorderWidth={0}
                                    backgroundInactive={colors.primaryLight}
                                    innerCircleStyle={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                />
                            </Row>

                            <SectionTitle>Select Category</SectionTitle>

                            <Row marginBottom="20px" style={{ justifyContent: "space-between" }}>
                                {categories.map(category => {
                                    return (
                                        <Chip
                                            onPress={() => onHandleChipSelected(category)}
                                            labelStyle={{
                                                fontFamily: "SFUIText-Medium",
                                                color: colors.secondary,
                                            }}
                                            style={[
                                                {
                                                    backgroundColor: `${category.color}20`,
                                                    padding: 14,
                                                },
                                                category.value === categorySelected.value && {
                                                    borderWidth: 1,
                                                    borderColor: category.color,
                                                },
                                            ]}
                                            key={category.value}
                                            label={category.label}
                                            leadingIcon={() => (
                                                <IconMarkEvent
                                                    width="14"
                                                    height="14"
                                                    fill={category.color}
                                                />
                                            )}
                                        />
                                    );
                                })}
                            </Row>

                            <DefaultButton
                                label={selectedEvent?.id ? "Update Event" : "Create Event"}
                                onPress={handleSubmit as any}
                            />
                        </ScrollView>
                    );
                }}
            </Formik>
        </>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
    },
});

export default EventForm;
