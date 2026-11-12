# Cisco Packet Tracer: Switching and Layer 2 Security Lab

**Type:** Hands-on networking lab  
**Platform:** Cisco Packet Tracer 9.0.1  
**Focus:** VLAN switching, redundancy, inter-VLAN routing, DHCP, and Layer 2 security  
**Status:** Configuration and final connectivity checks completed; supporting Packet Tracer file and screenshots pending upload.

## Objective

Build a three-switch network with distinct departments, redundant Layer 2 paths, inter-VLAN routing, and defensive switch configurations. Verify the behavior instead of treating successful command entry as proof.

## Topology

- **CORE-MLS1:** Cisco 3560 multilayer switch providing SVIs and inter-VLAN routing
- **ACCESS-SW1 / ACCESS-SW2:** Cisco 2960 switches
- Three inter-switch connections forming a redundant triangle
- Four department PCs, one DHCP test PC, a legitimate DHCP server, and a rogue DHCP server used for controlled testing

### VLANs and addressing

| VLAN | Purpose | Subnet / notes |
|---|---|---|
| 10 | STAFF | 192.168.10.0/24; gateway 192.168.10.1 |
| 20 | LAB | 192.168.20.0/24; gateway 192.168.20.1 |
| 30 | SERVERS | 192.168.30.0/24; gateway 192.168.30.1 |
| 50 | VTP-TEST | Created to verify VLAN propagation |
| 99 | MANAGEMENT | Management VLAN |
| 999 | NATIVE-BLACKHOLE | Configured native VLAN on 802.1Q trunks |

**Representative hosts:** STAFF-PC1 192.168.10.11, STAFF-PC2 192.168.10.12, LAB-PC1 192.168.20.11, LAB-PC2 192.168.20.12, SERVER1 192.168.30.10.

## Work completed

### Switching and redundancy

- Created VLANs and assigned access ports.
- Configured 802.1Q trunks with native VLAN 999 and disabled DTP negotiation on trunk interfaces.
- Inspected MAC address learning, flooding, and subsequent unicast delivery.
- Examined Spanning Tree Protocol (STP) root, designated, and alternate roles; tested redundant-link behavior and recovery.
- Configured VTP server/client roles and checked propagation of a test VLAN.

### Routing and DHCP

- Enabled multilayer switching and inter-VLAN routing through switch virtual interfaces (SVIs).
- Configured DHCP relay using `ip helper-address 192.168.30.10` on VLAN 10.
- Configured SERVER1 to offer STAFF leases starting at 192.168.10.100.
- Verified DHCP-TEST-PC received 192.168.10.100/24 with gateway 192.168.10.1 and DHCP server 192.168.30.10.

### Layer 2 security

- **Port Security:** Limited ACCESS-SW1 Fa0/1 to one sticky MAC, configured shutdown on violation, triggered a violation with a substituted device, then restored the authorized client and interface.
- **DHCP Snooping:** Enabled on access switches, trusted server and infrastructure ports, and recorded a client binding on VLAN 10 / Fa0/4.
- **Rogue DHCP scenario:** Connected an unauthorized DHCP server on an untrusted ACCESS-SW2 port. The test client still obtained its lease from the legitimate server.
- **Dynamic ARP Inspection (DAI):** Enabled inspection on VLAN 10 of ACCESS-SW1, trusted infrastructure uplinks, and confirmed the feature reported Active. The test client could resolve and ping its gateway.

## Final verification

| Test | Observed result |
|---|---|
| DHCP-TEST-PC to VLAN 10 gateway (192.168.10.1) | Ping passed |
| DHCP-TEST-PC to LAB-PC1 (192.168.20.11) | Ping passed |
| DHCP-TEST-PC to SERVER1 (192.168.30.10) | Ping passed |
| ACCESS-SW1 DHCP Snooping binding | 192.168.10.100, MAC 00:E0:8F:03:05:97, VLAN 10, Fa0/4 |
| ACCESS-SW1 DAI VLAN 10 | Active |
| ACCESS-SW1 port security Fa0/1 | Secure-up, maximum one MAC, violation mode shutdown |
| CORE-MLS1 trunks Gi0/1 and Gi0/2 | 802.1Q trunking, native VLAN 999; lab VLANs active and allowed |
| STP roles | Verified a loop-free topology on ACCESS-SW1 |

## Troubleshooting notes and limitations

1. **DAI trust settings:** Initially, Gigabit uplinks remained untrusted because DHCP Snooping trust is separate from DAI trust. Configuring `ip arp inspection trust` on each interface corrected the displayed state.
2. **Rogue DHCP test:** The authorized server remained in use, but that alone **does not prove** DHCP Snooping discarded a specific rogue DHCP Offer. Packet Tracer Simulation Mode hit its event-buffer limit during inspection.
3. **DAI inspection:** DAI reported Active, and normal ARP resolution worked, but the inspected packet counters showed zero. A blocked ARP spoof was **not** conclusively demonstrated.
4. **Trunk permissions:** The final `show interfaces trunk` output showed allowed VLANs `1-1005`. The lab VLANs were active, but tightening the allowed list would be a sensible production hardening improvement.

## What I learned

- A switch can flood an unknown destination without behaving like a hub; learned MAC addresses change subsequent forwarding.
- STP's blocked paths are a resilience mechanism, not necessarily evidence of a fault.
- Trunk configuration, native VLAN selection, VLAN availability, and STP forwarding state are different checks.
- Port Security, DHCP Snooping, and DAI address different Layer 2 threats, with independently configured trust boundaries.
- A successful ping is one piece of evidence; test conclusions should match what was actually observed.

## Lab files and topology

![Packet Tracer three-switch VLAN and security topology](Screenshot%202026-11-11%20195239.png)

- **[Open or download the completed Packet Tracer lab](Ch11_17_Completed_Switching_Lab.pkt)** (Cisco Packet Tracer 9.0.1, about 89 KB)
- **[View the full topology screenshot](Screenshot%202026-11-11%20195239.png)**

The `.pkt` project contains the device configurations and topology used for the documented tests. The disconnected ROGUE-PC in the screenshot was used for the earlier Port Security violation and recovery exercise.

## Next improvements

Capture individual device command-output evidence; check DAI with a reproducible ARP spoof test in a suitable environment; and narrow allowed VLANs on trunks after documenting the operational requirements.
