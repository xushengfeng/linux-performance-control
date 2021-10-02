modprobe acpi_call

function check(){
    case $1 in
        0)
            echo '\_SB.PCI0.LPC0.EC0.SPMO' > /proc/acpi/call
            echo $(cat /proc/acpi/call | cut -d '' -f1)
            ;;
        1)
            echo '\_SB.PCI0.LPC0.EC0.QCHO' > /proc/acpi/call
            echo $(cat /proc/acpi/call | cut -d '' -f1)
            ;;
        2)
            echo '\_SB.PCI0.LPC0.EC0.BTSM' > /proc/acpi/call
            echo $(cat /proc/acpi/call | cut -d '' -f1)
            ;;
    esac
}

case $1 in
    00)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.DYTC 0x000FB001' > /proc/acpi/call
        check 0
        ;;
    01)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.DYTC 0x0012B001' > /proc/acpi/call
        check 0
        ;;
    02)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.DYTC 0x0013B001' > /proc/acpi/call
        check 0
        ;;
    
    10)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x08' > /proc/acpi/call
        check 1
        ;;
    11)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x07' > /proc/acpi/call
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x05' > /proc/acpi/call
        check 1
        ;;

    20)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x05' > /proc/acpi/call
        check 2
        ;;
    21)
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x03' > /proc/acpi/call
        echo '\_SB.PCI0.LPC0.EC0.VPC0.SBMC 0x08' > /proc/acpi/call
        check 2
        ;;
esac